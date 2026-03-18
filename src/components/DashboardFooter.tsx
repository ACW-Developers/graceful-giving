const DashboardFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-muted-foreground">
        <p>© {year} Unashamed Charity Organization. All rights reserved.</p>
        <p className="italic">Our Kindness, Someone's Hope</p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
