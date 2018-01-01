import Typography from 'typography';
import bootstrapTheme from 'typography-theme-bootstrap';

bootstrapTheme.overrideThemeStyles = () => ({
  a: {
    color: '#005580',
    textDecoration: 'none',
  },
  body: {
    backgroundColor: '#9CAAC6',
  },
  img: {
    marginBottom: 0,
  },
});

export default new Typography(bootstrapTheme);
