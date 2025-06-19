import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [healthMetrics, setHealthMetrics] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [showMetricModal, setShowMetricModal] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(null);
  const [metricInputValue, setMetricInputValue] = useState('');
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [showBPModal, setShowBPModal] = useState(false);
  const [bpInput, setBpInput] = useState({ systolic: '', diastolic: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const userRes = await fetch("/api/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!userRes.ok) throw new Error("Failed to fetch user data");
      const userData = await userRes.json();
      setUser(userData);

      const metricsPromise = fetch(`/api/health-metrics?phoneNumber=${userData.phoneNumber}`)
        .then(res => res.ok ? res.json() : Promise.reject("Metrics failed"))
        .catch(() => []);

      const appointmentsPromise = fetch(`/api/appointments?userId=${userData.id}`)
        .then(res => res.ok ? res.json() : Promise.reject("Appointments failed"))
        .catch(() => []);

      const weightPromise = fetch(`/api/weight-data?phoneNumber=${userData.phoneNumber}`)
        .then(res => res.ok ? res.json() : Promise.reject("Weight failed"))
        .catch(() => []);

      const bpPromise = fetch(`/api/blood-pressure-data?phoneNumber=${userData.phoneNumber}`)
        .then(res => res.ok ? res.json() : Promise.reject("BP failed"))
        .catch(() => []);

      const [metrics, appointments, weight, bp] = await Promise.all([
        metricsPromise,
        appointmentsPromise,
        weightPromise,
        bpPromise
      ]);

      setHealthMetrics(Array.isArray(metrics) ? metrics : []);
      setAppointments(Array.isArray(appointments) ? appointments : []);
      setWeightData(Array.isArray(weight) ? weight : []);
      setBloodPressureData(Array.isArray(bp) ? bp : []);
    } catch (err) {
      console.error("Error in fetchAllData:", err);
      setHealthMetrics([]);
      setAppointments([]);
      setWeightData([]);
      setBloodPressureData([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />
      <div className="flex-1 overflow-y-auto">
        <MainContent 
          user={user}
          loading={loading}
          activeTab={activeTab}
          healthMetrics={healthMetrics}
          appointments={appointments}
          weightData={weightData}
          bloodPressureData={bloodPressureData}
          showMetricModal={showMetricModal}
          setShowMetricModal={setShowMetricModal}
          currentMetric={currentMetric}
          setCurrentMetric={setCurrentMetric}
          metricInputValue={metricInputValue}
          setMetricInputValue={setMetricInputValue}
          showWeightModal={showWeightModal}
          setShowWeightModal={setShowWeightModal}
          weightInput={weightInput}
          setWeightInput={setWeightInput}
          showBPModal={showBPModal}
          setShowBPModal={setShowBPModal}
          bpInput={bpInput}
          setBpInput={setBpInput}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          fetchAllData={fetchAllData}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </div>
    </div>
  );
};

export default PatientDashboard;
