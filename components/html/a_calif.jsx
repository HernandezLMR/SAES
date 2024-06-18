import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Calif() {
  let query = useQuery();
  let grupo = query.get("grupo");

  useEffect(() => {
    // Perform your operations with the "grupo" value here
    console.log("Grupo value:", grupo);
  }, [grupo]);

  return (
    <div>
      <h1>Another Page</h1>
      <p>Grupo: {grupo}</p>
    </div>
  );
}
