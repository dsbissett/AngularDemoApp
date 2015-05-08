using AngularDemoApp.Entities;
using SharpRepository.Repository;

namespace AngularDemoApp.Repositories
{
    public interface IStudentRepository : IRepository<Student, int>
    {
    }
}