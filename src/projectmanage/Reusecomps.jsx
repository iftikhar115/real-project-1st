
function Reuseablecomponents({ title, value, icon, color }) {
  return (
    <>
      <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
          <h3>{value}</h3>
          <p>{title}</p>
        </div>
      </div>
    </>
  )
}
export default Reuseablecomponents;