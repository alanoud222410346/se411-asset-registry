import { createContext, useContext, useState } from 'react'
import { initialAssets } from '../data/assets'

const AssetContext = createContext(null)

export function AssetProvider({ children, startAssets = initialAssets }) {
  const [assets, setAssets] = useState(startAssets)

  function addAsset(asset) {
    const newId = assets.length > 0 ? Math.max(...assets.map((a) => a.id)) + 1 : 1
    setAssets([...assets, { ...asset, id: newId }])
  }

  function updateAsset(id, changes) {
    setAssets(assets.map((a) => (a.id === id ? { ...a, ...changes, id } : a)))
  }

  function deleteAsset(id) {
    setAssets(assets.filter((a) => a.id !== id))
  }

  function getAsset(id) {
    return assets.find((a) => a.id === id)
  }

  return (
    <AssetContext.Provider
      value={{ assets, addAsset, updateAsset, deleteAsset, getAsset }}
    >
      {children}
    </AssetContext.Provider>
  )
}

export function useAssets() {
  return useContext(AssetContext)
}
