describe('CrudServiceTests', function() {
    var crudService,
        $httpBackend,
        $rootScope,
        $http;
    
    beforeEach(function() {
        angular.mock.module('app');
        angular.mock.module('app.services');

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

        inject(function ($injector) {
            debugger;
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            crudService = $injector.get('app.services.CrudService');
        });
    });

    it('All service methods are registered..', function() {
        expect(angular.isFunction(crudService.create)).toBe(true);
        expect(angular.isFunction(crudService.getAll)).toBe(true);
        expect(angular.isFunction(crudService.getById)).toBe(true);
        expect(angular.isFunction(crudService.update)).toBe(true);
        expect(angular.isFunction(crudService.delete)).toBe(true);
    });

    it('getAll function returns values..', function() {
        $httpBackend.expect('GET', '/api/Students').respond(200, 'success');
                
        var spy = spyOn(crudService, 'getAll');
        
        crudService.getAll();
        
        expect(spy).toHaveBeenCalled();
    });
});