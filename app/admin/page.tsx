import AdminDashboard from "@/components/AdminDashboard";

export default function Page() {
  return (
    <section className="pt-32 pb-32">
      <div className="container-x">
        <span className="eyebrow">Admin</span>
        <h1 className="h-display text-5xl md:text-7xl mt-3">Dashboard</h1>
        <p className="mt-6 max-w-xl text-espresso/70">Blokkeer datums en tijden, bekijk binnenkomende boekingen.</p>
        <div className="mt-12">
          <AdminDashboard />
        </div>
      </div>
    </section>
  );
}
