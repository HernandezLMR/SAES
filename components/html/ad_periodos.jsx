"use client";

import { useState, useEffect } from "react";
import styles from "../grupos_styles2.module.css"

export default function SetPeriods() {
  const [active, setActive] = useState(false);
  const [period, setPeriod] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("1");
  const [reload, setReload] = useState(false); // Added state for reload

  useEffect(() => {
    async function fetchPeriods() {
      try {
        const response = await fetch("http://localhost:3000/api/periods", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
        setActive(data.active);
        setPeriod(data.period);
      } catch (error) {
        console.error("Error fetching periods:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPeriods();
  }, [reload]); // Added reload as a dependency

  const handleStartPeriod = async () => {
    const response = await fetch("http://localhost:3000/api/periods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        period: selectedPeriod,
        active: true,
      }),
    });

    if (response.ok) {
      setReload(!reload); // Toggle reload to trigger useEffect
    }

    console.log("Start period", selectedPeriod);
  };

  const handleEndPeriod = async () => {
    const response = await fetch("http://localhost:3000/api/periods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: false,
      }),
    });

    if (response.ok) {
      setReload(!reload); // Toggle reload to trigger useEffect
    }

    console.log("End period", period);
  };

  const handleCloseSemester = async () => {
    const response = await fetch("http://localhost:3000/api/close", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Get bent losers",
        }),
      });
    console.log("Close semester");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!active ? (
        <div className={styles.submit}>
          <span>Periodos:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={handleStartPeriod}>Iniciar periodo</button>
        </div>
      ) : (
        <div className={styles.submit}>
          <span>Periodo actual: {period}</span>
          <p></p>
          <button onClick={handleEndPeriod}>Terminar periodo</button>
          <p></p>
          <button onClick={handleCloseSemester}>Cerrar Semestre</button>
        </div>
      )}
    </div>
  );
}
