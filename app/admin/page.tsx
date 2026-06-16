import AdminDashboard from "@/components/AdminDashboard";
import AdminHeader from "@/components/AdminHeader";

export default function Page() {
  return (
    <div className="min-h-screen bg-bone">
      <AdminHeader />
      <main className="pt-24 pb-32">
        <div className="container-x">
          <span className="eyebrow">Admin</span>
          <h1 className="h-display text-5xl md:text-7xl mt-3">Dashboard</h1>
          <p className="mt-6 max-w-xl text-espresso/70">Blokkeer datums en tijden, bekijk binnenkomende boekingen.</p>
          <div className="mt-12">
            <AdminDashboard />
          </div>
        </div>
      </main>
    </div>
  );
}
