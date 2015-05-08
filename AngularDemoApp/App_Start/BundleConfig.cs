using System.Web;
using System.Web.Optimization;
using Microsoft.Ajax.Utilities;

namespace AngularDemoApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/scripts/application").Include(
                        "~/Scripts/angular.js",
                        "~/Scripts/angular-resource.js",
                        "~/Scripts/angular-local-storage.js",
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/modernizr-*",
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/scripts/studentApp").Include(
                        "~/App/app.js",
                        "~/App/app.dependencies.js",
                        "~/App/Services/app.services.js",
                        "~/App/Controllers/app.controllers.js"                        
                        ));

            bundles.Add(new ScriptBundle("~/scripts/student").Include(
                        "~/App/Services/crudService.module.js",
                        "~/App/Controllers/student.module.js"
                    ));
                        
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
