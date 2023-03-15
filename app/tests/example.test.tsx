import { render, screen } from '@testing-library/react'
import { Example } from '~/components/example'

describe('Example', () => {
	it('should render', () => {
		render(<Example />)
		expect(screen.getByText(/hello, world/i)).toBeInTheDocument()
	})
})
