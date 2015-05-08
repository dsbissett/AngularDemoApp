using AngularDemoApp.Entities;
using AngularDemoApp.Models;
using AngularDemoApp.Repositories;
using AutoMapper;
using System;
using System.Linq;
using System.Web.Http;

namespace AngularDemoApp.Controllers.api
{
    [RoutePrefix("/api")]
    public class StudentsController : ApiController
    {
        private IStudentRepository _repository;

        public StudentsController()
        {
            _repository = new StudentRepository();
            AutoMapper.Mapper.CreateMap<StudentViewModel, Student>();
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            var result = _repository.GetAll().Where(x => x.DeletedDate == null).OrderByDescending(x => x.CreatedDate).Take(10);

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetById(string studentId)
        {
            var result = _repository.Find(x => x.StudentID == new Guid(studentId));

            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult CreateStudent(StudentViewModel student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var model = Mapper.Map<Student>(student);

            model.StudentID   = Guid.NewGuid();
            model.VersionDate = DateTime.Now;
            model.VersionUser = User.Identity.Name ?? "UNKNOWN";
            model.CreatedDate = DateTime.Now;
            model.CreatedUser = User.Identity.Name ?? "UNKNOWN";

            _repository.Add(model);

            return Ok(student);
        }

        [HttpPut]
        public IHttpActionResult UpdateStudent(StudentViewModel student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var entity = _repository.Find(x => x.StudentID == student.StudentID);

            entity.FirstName   = student.FirstName;
            entity.LastName    = student.LastName;
            entity.Address     = student.Address;
            entity.City        = student.City;
            entity.ZipCode     = student.ZipCode;
            entity.Phone       = student.Phone;
            entity.Email       = student.Email;
            entity.VersionDate = DateTime.Now;
            entity.VersionUser = User.Identity.Name;
            
            _repository.Update(entity);

            return Ok(student);
        }

        [HttpDelete]
        public IHttpActionResult DeleteStudent(string studentId)
        {
            if (string.IsNullOrWhiteSpace(studentId))
            {
                return BadRequest();
            }

            //  This deletes the record.. mark deleted date instead..
            //_repository.Delete(x => x.StudentID == new Guid(studentId));

            var model = _repository.Find(x => x.StudentID == new Guid(studentId));

            model.DeletedDate = DateTime.Now;

            _repository.Update(model);

            return Ok(studentId);
        }
    }
}
