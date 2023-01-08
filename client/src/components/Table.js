import React from "react";

function Table({ customers }) {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Age</th>
          <th className="px-4 py-2">Address</th>
          <th className="px-4 py-2">Postcode</th>
          <th className="px-4 py-2">State</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(customers)
          ? customers.map((row) => (
              <tr key={row.name}>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.age}</td>
                <td className="px-4 py-2">{row.address}</td>
                <td className="px-4 py-2">{row.postcode}</td>
                <td className="px-4 py-2">{row.state}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
}

export default Table;
