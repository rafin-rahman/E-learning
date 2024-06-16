import { Businesses, columns } from "./columns";
import { DataTable } from "./data-table";
import loadBusinessesAction from "./loadBusinessesAction";

async function getData(): Promise<Businesses[]> {
  // Fetch data from your API here.
  return [
    {
      name: "Elizabeth School of London",
      logo: "https://www.pengroup.com/_next/image?url=%2Flogos%2FESL%2FESL.png&w=640&q=75",
      licenses: 890,
      earnings: 37845,
    },
    {
      name: "Elizabeth School of London",
      logo: "https://www.pengroup.com/_next/image?url=%2Flogos%2FESL%2FESL.png&w=640&q=75",
      licenses: 890,
      earnings: 37845,
    },
    {
      name: "Elizabeth School of London",
      logo: "https://www.pengroup.com/_next/image?url=%2Flogos%2FESL%2FESL.png&w=640&q=75",
      licenses: 890,
      earnings: 37845,
    },
  ];
}

export default async function ManageBusinessClients() {
  const data = await getData();
  const businesses = await loadBusinessesAction();
  console.log(businesses);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
