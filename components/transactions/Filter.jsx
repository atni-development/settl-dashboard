import Select from "../select/Select";

const dateSelect = [
  { id: 1, name: "23 Nov 2023- 21 Feb 2024" },
  { id: 2, name: "23 Nov 2023- 21 Feb 2024" },
  { id: 3, name: "23 Nov 2023- 21 Feb 2024" },
];

const balance = [
  { id: 1, name: "Todas las transacciones" },
  { id: 2, name: "Pendientes" },
  { id: 3, name: "Canceladas" },
  { id: 4, name: "En progreso" },
  { id: 5, name: "Completadas" },

];

const filters = [
  { id: 1, name: "Todas las tarjetas" },
  { id: 2, name: "Tarjeta Santader ***4089" },
  { id: 3, name: "Tarjeta American Express ***4083" },
  { id: 4, name: "Tarjeta Bancomer ***4083" },
  { id: 5, name: "Tarjeta Banorte ***3833" },
];

const Filter = () => {
  return (
    <div className="filters-item">
      <div className="single-item">
        {/* Select  */}
        <Select data={dateSelect} btn="border" />
      </div>
      <div className="single-item">
        {/* Select */}
        <Select data={balance} btn="border" />
      </div>
      <div className="single-item">
        {/* Select */}
        <Select data={filters} btn="border" />
      </div>
      <div className="single-item">
        <button>Quitar filtros</button>
      </div>
    </div>
  );
};

export default Filter;
