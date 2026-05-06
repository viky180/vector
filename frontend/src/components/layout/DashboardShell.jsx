import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardShell = ({ title, children }) => {
  return (
    <div className="app-bg min-h-screen md:flex">
      <Sidebar />
      <main className="min-w-0 flex-1 space-y-6 p-4 md:p-8">
        <Topbar title={title} />
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;
