import Button from "./ui/Button";
import Card from "./ui/Card";
function TableCard({ table, onReserve }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold">Table {table.tableNumber}</h3>

      <p className="text-gray-600">Seats: {table.seats}</p>

      <Button onClick={() => onReserve(table)} className="mt-3">
        Reserve Table
      </Button>
    </Card>
  );
}

export default TableCard;
