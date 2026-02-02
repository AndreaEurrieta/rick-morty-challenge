import { render, screen } from '@testing-library/react';
import { Badge, Icon, Skeleton, Alert, StatusDot, Card } from '../ui';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>S01E01</Badge>);
    expect(screen.getByText('S01E01')).toBeInTheDocument();
  });

  it('applies blue variant', () => {
    const { container } = render(<Badge variant="blue">Test</Badge>);
    expect(container.firstChild).toHaveClass('badge', 'badge-blue');
  });

  it('applies green variant', () => {
    const { container } = render(<Badge variant="green">Test</Badge>);
    expect(container.firstChild).toHaveClass('badge', 'badge-green');
  });

  it('applies purple variant', () => {
    const { container } = render(<Badge variant="purple">Test</Badge>);
    expect(container.firstChild).toHaveClass('badge', 'badge-purple');
  });

  it('applies default variant (green) when not specified', () => {
    const { container } = render(<Badge>Test</Badge>);
    expect(container.firstChild).toHaveClass('badge', 'badge-green');
  });
});

describe('Icon', () => {
  it('renders check icon', () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('path')).toHaveAttribute('d', 'M5 13l4 4L19 7');
  });

  it('renders chevron-left icon', () => {
    const { container } = render(<Icon name="chevron-left" />);
    expect(container.querySelector('path')).toHaveAttribute('d', 'M15 19l-7-7 7-7');
  });

  it('renders chevron-right icon', () => {
    const { container } = render(<Icon name="chevron-right" />);
    expect(container.querySelector('path')).toHaveAttribute('d', 'M9 5l7 7-7 7');
  });

  it('renders x icon', () => {
    const { container } = render(<Icon name="x" />);
    expect(container.querySelector('path')).toHaveAttribute('d', 'M6 18L18 6M6 6l12 12');
  });

  it('renders external-link icon', () => {
    const { container } = render(<Icon name="external-link" />);
    expect(container.querySelector('path')).toHaveAttribute(
      'd',
      'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
    );
  });

  it('renders error icon', () => {
    const { container } = render(<Icon name="error" />);
    expect(container.querySelector('path')).toHaveAttribute(
      'd',
      'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    );
  });

  it('renders github icon with fill', () => {
    const { container } = render(<Icon name="github" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('applies custom className', () => {
    const { container } = render(<Icon name="check" className="w-8 h-8" />);
    expect(container.querySelector('svg')).toHaveClass('w-8', 'h-8');
  });

  it('applies default className', () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector('svg')).toHaveClass('w-4', 'h-4');
  });

  it('applies custom strokeWidth', () => {
    const { container } = render(<Icon name="check" strokeWidth={3} />);
    expect(container.querySelector('path')).toHaveAttribute('stroke-width', '3');
  });

  it('uses default strokeWidth of 2', () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector('path')).toHaveAttribute('stroke-width', '2');
  });
});

describe('Skeleton', () => {
  it('renders with card variant', () => {
    const { container } = render(<Skeleton variant="card" />);
    expect(container.firstChild).toHaveClass('skeleton-card');
  });

  it('renders with tall variant', () => {
    const { container } = render(<Skeleton variant="tall" />);
    expect(container.firstChild).toHaveClass('skeleton-tall');
  });

  it('renders with default variant', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('skeleton');
  });

  it('applies animation delay', () => {
    const { container } = render(<Skeleton variant="card" delay={200} />);
    expect(container.firstChild).toHaveStyle({ animationDelay: '200ms' });
  });

  it('does not apply animation delay when delay is 0', () => {
    const { container } = render(<Skeleton variant="card" delay={0} />);
    expect(container.firstChild).not.toHaveAttribute('style');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="my-custom-class" />);
    expect(container.firstChild).toHaveClass('my-custom-class');
  });
});

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert variant="error">Error message</Alert>);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<Alert variant="error" icon="⚠️">Error</Alert>);
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('applies error variant styles', () => {
    const { container } = render(<Alert variant="error">Error</Alert>);
    expect(container.firstChild).toHaveClass('alert', 'alert-error');
  });

  it('applies warning variant styles', () => {
    const { container } = render(<Alert variant="warning">Warning</Alert>);
    expect(container.firstChild).toHaveClass('alert', 'alert-warning');
  });

  it('applies custom className', () => {
    const { container } = render(<Alert variant="error" className="mt-4">Error</Alert>);
    expect(container.firstChild).toHaveClass('mt-4');
  });
});

describe('StatusDot', () => {
  it('renders status-alive class for Alive status', () => {
    const { container } = render(<StatusDot status="Alive" />);
    expect(container.querySelector('.status-dot')).toHaveClass('status-alive');
  });

  it('renders status-dead class for Dead status', () => {
    const { container } = render(<StatusDot status="Dead" />);
    expect(container.querySelector('.status-dot')).toHaveClass('status-dead');
  });

  it('renders status-unknown class for unknown status', () => {
    const { container } = render(<StatusDot status="unknown" />);
    expect(container.querySelector('.status-dot')).toHaveClass('status-unknown');
  });

  it('shows label by default', () => {
    render(<StatusDot status="Alive" />);
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<StatusDot status="Alive" showLabel={false} />);
    expect(screen.queryByText('Alive')).not.toBeInTheDocument();
  });

  it('applies correct text color for Alive status', () => {
    render(<StatusDot status="Alive" />);
    expect(screen.getByText('Alive')).toHaveClass('text-green-400');
  });

  it('applies correct text color for Dead status', () => {
    render(<StatusDot status="Dead" />);
    expect(screen.getByText('Dead')).toHaveClass('text-red-400');
  });

  it('applies correct text color for unknown status', () => {
    render(<StatusDot status="unknown" />);
    expect(screen.getByText('unknown')).toHaveClass('text-gray-400');
  });

  it('renders with status-badge container', () => {
    const { container } = render(<StatusDot status="Alive" />);
    expect(container.querySelector('.status-badge')).toBeInTheDocument();
  });
});

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies card class', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('card');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="my-custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('card', 'my-custom-class');
  });

  describe('Card.Header', () => {
    it('renders children correctly', () => {
      render(<Card.Header>Header content</Card.Header>);
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('applies card-header class', () => {
      const { container } = render(<Card.Header>Header</Card.Header>);
      expect(container.firstChild).toHaveClass('card-header');
    });

    it('applies custom className', () => {
      const { container } = render(<Card.Header className="custom-header">Header</Card.Header>);
      expect(container.firstChild).toHaveClass('card-header', 'custom-header');
    });
  });

  describe('Card.Body', () => {
    it('renders children correctly', () => {
      render(<Card.Body>Body content</Card.Body>);
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('applies card-body class', () => {
      const { container } = render(<Card.Body>Body</Card.Body>);
      expect(container.firstChild).toHaveClass('card-body');
    });

    it('applies custom className', () => {
      const { container } = render(<Card.Body className="custom-body">Body</Card.Body>);
      expect(container.firstChild).toHaveClass('card-body', 'custom-body');
    });
  });

  it('renders full card structure with Header and Body', () => {
    render(
      <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Content</Card.Body>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
