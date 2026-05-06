const StatCard = ({ label, value, helper }) => {
  return (
    <div className="metric-tile">
      <p className="text-xs font-semibold uppercase text-stone-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-[#071647]">{value}</p>
      {helper ? <p className="mt-2 text-xs text-stone-500">{helper}</p> : null}
    </div>
  );
};

export default StatCard;
