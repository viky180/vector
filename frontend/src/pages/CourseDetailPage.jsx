import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../api/client";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const result = await apiRequest(`/courses/${id}`);
        setCourse(result);
      } catch (err) {
        setError(err.message);
      }
    };

    load();
  }, [id]);

  return (
    <div className="app-bg min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="text-sm font-semibold text-stone-700 hover:text-[#071647]">Back to home</Link>

        {error ? <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        {course ? (
          <div className="mt-4 space-y-5">
            <section className="panel overflow-hidden">
              <div className="grid gap-8 p-6 md:grid-cols-[1.25fr_0.75fr] md:p-8">
                <div>
                  <p className="eyebrow">Course detail</p>
                  <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#071647]">{course.title}</h1>
                  <p className="mt-3 max-w-2xl text-lg leading-8 text-stone-600">{course.description}</p>
                </div>
                <div className="grid gap-0 border-y border-stone-200 text-sm">
                  <div className="py-3">
                    <p className="text-stone-500">Teacher</p>
                    <p className="font-semibold text-[#071647]">{course.teacher}</p>
                  </div>
                  <div className="border-t border-stone-200 py-3">
                    <p className="text-stone-500">Level</p>
                    <p className="font-semibold text-[#071647]">{course.level}</p>
                  </div>
                  <div className="border-t border-stone-200 py-3">
                    <p className="text-stone-500">Enrolled Students</p>
                    <p className="font-semibold text-[#071647]">{course.enrolledStudents}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <div className="panel p-5">
                <h3 className="section-title">Live Classes</h3>
                <div className="mt-4 divide-y divide-stone-200">
                  {course.liveClasses?.map((item) => (
                    <div key={item.id} className="py-4">
                      <p className="font-semibold text-[#071647]">{item.title}</p>
                      <p className="text-sm text-stone-600">{new Date(item.startTime).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel p-5">
                <h3 className="section-title">Assignments</h3>
                <div className="mt-4 divide-y divide-stone-200">
                  {course.assignments?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 py-4">
                      <p className="font-semibold text-[#071647]">{item.title}</p>
                      <p className="text-sm text-stone-600">Due: {item.dueDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CourseDetailPage;
