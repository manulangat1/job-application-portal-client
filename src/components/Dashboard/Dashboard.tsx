import { useEffect, useState } from "react";
import Card from "../Reusable/Cards/ReusableCard";
import { getDashBoardAPI } from "../../store/slices/jobs/jobService";
import { Typography } from "@mui/material";

// TODO: implement route to fetch all the status from the BE.
//  In the mean time, use hard coded values from the common.utils.ts file
interface Stat {
  id: number;
  count: number;
  status: string;
}
function Dashboard() {
  // trigger  the dashboard API
  const [stats, setStats] = useState<Stat[]>([]);
  const loadDashboard = async () => {
    try {
      const res = await getDashBoardAPI();
      setStats(res);
    } catch (error) {
      console.log(error);
      // TODO: Add appopriate error handling.
    }
  };
  useEffect(() => {
    loadDashboard();
  }, []);
  return (
    <main className="home">
      <Typography variant="h2">Here are your job application stats.</Typography>
      <section className="card-section">
        {stats?.map(({ id, count, status }) => (
          <Card key={id} numberOfApplications={count} status={status} />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;
