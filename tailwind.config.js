/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			mint: {
  				'50': '#f6fff7',
  				'100': '#e6ffe9',
  				'200': '#c6f7d9',
  				'300': '#a8efc7',
  				'400': '#7fdfad',
  				'500': '#5bcf95',
  				'600': '#3fb37a',
  				'700': '#2f8f61',
  				'800': '#287351',
  				'900': '#205b41'
  			},
  			blush: {
  				'50': '#fff6f9',
  				'100': '#ffe9f0',
  				'200': '#ffd1e1',
  				'300': '#ffb4cf',
  				'400': '#ff8fb6',
  				'500': '#ff6a9d',
  				'600': '#f24a83',
  				'700': '#d6386e',
  				'800': '#b02e5a',
  				'900': '#8c264a'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			soft: '0 8px 30px rgba(0,0,0,0.05)'
  		},
  		borderRadius: {
  			xl2: '1.25rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'card-gradient': 'linear-gradient(135deg, #ffe4ee 0%, #fff6fb 40%, #eafff0 100%)',
  			'cta-gradient': 'linear-gradient(135deg, #f0b3d4 0%, #e3c7ff 50%, #bff1cf 100%)'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate")
],
};


