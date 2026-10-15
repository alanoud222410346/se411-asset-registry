import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { AssetProvider } from '../context/AssetContext'
import AssetList from '../pages/AssetList'

const sample = [
  {
    id: 1,
    name: 'Dell Latitude',
    brand: 'Dell',
    serialNumber: 'D-1',
    purchaseDate: '2024-01-01',
    price: 1000,
    status: 'In use',
  },
  {
    id: 2,
    name: 'MacBook Pro',
    brand: 'Apple',
    serialNumber: 'A-2',
    purchaseDate: '2024-02-02',
    price: 2000,
    status: 'In stock',
  },
]

function setup(assets = sample) {
  render(
    <MemoryRouter>
      <AssetProvider startAssets={assets}>
        <AssetList />
      </AssetProvider>
    </MemoryRouter>
  )
}

describe('AssetList', () => {
  it('shows every asset in the table', () => {
    setup()
    expect(screen.getByText('Dell Latitude')).toBeInTheDocument()
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument()
  })

  it('has an edit link for each asset', () => {
    setup()
    const links = screen.getAllByRole('link', { name: 'Edit' })
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/edit/1')
  })

  it('deletes an asset after the user confirms', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    setup()
    await userEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0])
    expect(screen.queryByText('Dell Latitude')).not.toBeInTheDocument()
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument()
  })

  it('keeps the asset when the user cancels', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    setup()
    await userEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0])
    expect(screen.getByText('Dell Latitude')).toBeInTheDocument()
  })

  it('shows a message when there are no assets', () => {
    setup([])
    expect(screen.getByText(/No assets yet/)).toBeInTheDocument()
  })
})
