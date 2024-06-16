import { Businesses, columns } from "./columns";
import { DataTable } from "./data-table";
import loadBusinessesAction from "./loadBusinessesAction";

async function getData(): Promise<Businesses[]> {
  const response = await loadBusinessesAction();

  if ("error" in response) {
    throw new Error(response.error);
  }

  const businesses = response as Businesses[];

  return businesses;
}

export default async function ManageBusinessClients() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
