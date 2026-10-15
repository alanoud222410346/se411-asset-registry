import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AssetProvider } from '../context/AssetContext'
import AssetForm from '../pages/AssetForm'
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
]

function setup(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AssetProvider startAssets={sample}>
        <Routes>
          <Route path="/" element={<AssetList />} />
          <Route path="/add" element={<AssetForm />} />
          <Route path="/edit/:id" element={<AssetForm />} />
        </Routes>
      </AssetProvider>
    </MemoryRouter>
  )
}

describe('AssetForm', () => {
  it('shows errors when required fields are empty', async () => {
    setup('/add')
    await userEvent.click(screen.getByRole('button', { name: 'Add asset' }))
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Brand is required')).toBeInTheDocument()
    expect(screen.getByText('Serial number is required')).toBeInTheDocument()
    expect(screen.getByText('Purchase date is required')).toBeInTheDocument()
  })

  it('adds a new asset and goes back to the list', async () => {
    setup('/add')
    await userEvent.type(screen.getByLabelText('Name'), 'HP ProBook')
    await userEvent.type(screen.getByLabelText('Brand'), 'HP')
    await userEvent.type(screen.getByLabelText('Serial number'), 'HP-77')
    fireEvent.change(screen.getByLabelText('Purchase date'), {
      target: { value: '2025-03-04' },
    })
    await userEvent.type(screen.getByLabelText('Price ($)'), '800')
    await userEvent.click(screen.getByRole('button', { name: 'Add asset' }))

    expect(screen.getByRole('heading', { name: 'Assets' })).toBeInTheDocument()
    expect(screen.getByText('HP ProBook')).toBeInTheDocument()
  })

  it('fills the form with the asset in edit mode', () => {
    setup('/edit/1')
    expect(screen.getByRole('heading', { name: 'Edit asset' })).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('Dell Latitude')
    expect(screen.getByLabelText('Brand')).toHaveValue('Dell')
  })

  it('saves changes in edit mode', async () => {
    setup('/edit/1')
    const nameInput = screen.getByLabelText('Name')
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'Dell XPS')
    await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(screen.getByText('Dell XPS')).toBeInTheDocument()
    expect(screen.queryByText('Dell Latitude')).not.toBeInTheDocument()
  })

  it('shows a message when the asset does not exist', () => {
    setup('/edit/99')
    expect(screen.getByText('Asset not found')).toBeInTheDocument()
  })
})
