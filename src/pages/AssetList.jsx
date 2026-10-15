import { Link } from 'react-router-dom'
import { useAssets } from '../context/AssetContext'

function AssetList() {
  const { assets, deleteAsset } = useAssets()

  function handleDelete(asset) {
    if (window.confirm('Delete ' + asset.name + '?')) {
      deleteAsset(asset.id)
    }
  }

  return (
    <section>
      <h1>Assets</h1>
      <p>{assets.length} computers registered.</p>

      {assets.length === 0 ? (
        <p>No assets yet. Use "Add asset" to create one.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Serial number</th>
                <th>Purchase date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.id}</td>
                  <td>{asset.name}</td>
                  <td>{asset.brand}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.purchaseDate}</td>
                  <td>${asset.price}</td>
                  <td>{asset.status}</td>
                  <td className="actions">
                    <Link className="button" to={'/edit/' + asset.id}>
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(asset)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default AssetList
