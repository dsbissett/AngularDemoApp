/// <reference path="../controllers/student.module.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../scripts/typings/angular-local-storage/angular-local-storage.d.ts" />

module app.services {
     export interface ICrudService {
         create(student: IStudent): IStudent;
         getById(studentId: string): IStudent;
         getAll(): Array<IStudent>;
         update(student: IStudent): IStudent;
         delete(studentId: string): void;
         load(): void;
         refresh():Array<IStudent>;
     }

     class CrudService implements ICrudService {
         resource : any;   
         local    : ng.local.storage.ILocalStorageService;     

         static $inject = ['$resource', 'localStorageService'];

         constructor($resource: ng.resource.IResourceService, ngLocal: ng.local.storage.ILocalStorageService) {
             this.local = ngLocal;
             this.resource = $resource('/api/Students/:student', { student: '@student'}, { get:{ method: 'GET', isArray: true }, getById:{ method: 'GET', isArray: false }, update: { method: 'PUT', isArray: false }});
         }        

         load(): void {
             /// <summary>Get data from server and add to localStorage using StudentID as key</summary>
             this.resource.query().$promise.then(data => {                 
                 for (var i = 0; i < data.length; i++) {                     
                     this.addStudentToLocalStorage(data[i]);
                 }
             });             
         }

         refresh(): Array<IStudent> {
             this.local.clearAll();
             return this.getAll();
         }

         private addStudentToLocalStorage(data: IStudent) { 
             /// <summary>Adds data to localStorage</summary>            
             this.local.set<IStudent>(data.studentID, data);
         }

         private deleteStudentInLocalStorage(studentId: string): void {
             /// <summary>Deletes student from localStorage</summary>
             this.local.remove(studentId);
         }

         private updateStudentInLocalStorage(data: IStudent): void {
             /// <summary>Updates student record in localStorage</summary>
             this.deleteStudentInLocalStorage(data.studentID);
             this.addStudentToLocalStorage(data);
         }

         private getAllFromLocalStorage() {
             /// <summary>Gets all entries from localStorage.</summary>
             var keys: Array<string> = this.local.keys(),
                 bucket: Array<IStudent> = [];

             for (var i = 0; i < keys.length; i++) {
                 bucket.push(<IStudent>this.local.get(keys[i]));
             }

             return bucket;
         }

         create(student: IStudent): IStudent {
             /// <summary>Create new student:  POST to /api/Students</summary>
             var result: IStudent = this.resource.save(student).$promise.then((data) => {
                 this.refresh();
                 //this.addStudentToLocalStorage(data);
             });

             return result;
         }

         getById(studentId: string): IStudent {
             /// <summary>Gets student by Id:  GET to /api/Students/:id</summary>
             var student: IStudent = this.local.get<IStudent>(studentId);

             if (student === null) {
                 //  Student did not exist in localStorage..
                 //  Get from server, add to localStorage.                 
                 return this.resource.getById({ studentId: studentId });
             }

             return student;
         }

         getAll(): Array<IStudent> {
             /// <summary>Gets all students:  GET to /api/Students</summary>
             var result = this.getAllFromLocalStorage();
             
             if (angular.isUndefined(result) || result.length === 0) {
                 return this.resource.get();
             } else {
                 return result;   
             }             
         }

         update(student: IStudent): IStudent {
             /// <summary>Updates student:  PUT to /api/Students</summary>
             this.updateStudentInLocalStorage(student);
             var result: IStudent = this.resource.update(student);

             return result;
         }

         delete(studentId: string): void {
             /// <summary>Deletes student:  removes from localStorage, send DELETE to /api/Students</summary>
             this.deleteStudentInLocalStorage(studentId);
             this.resource.delete({ studentId: studentId });             
         }
     }

     angular.module('app.services').service('app.services.CrudService', CrudService);
 }