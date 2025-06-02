import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, TextField, Card, CardContent, CardActions, Grid, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import api from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch {
      alert('Erro ao buscar produtos!');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/products', { name, price });
      setName('');
      setPrice('');
      fetchProducts();
    } catch {
      alert('Erro ao adicionar produto!');
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Typography variant="h3" gutterBottom color="primary" fontWeight={700} align="center">
          Catálogo de Produtos
        </Typography>
      </motion.div>
      <Box component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} mb={4}>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <TextField label="Nome" value={name} onChange={e => setName(e.target.value)} required />
          <TextField label="Preço" value={price} onChange={e => setPrice(e.target.value)} required type="number" inputProps={{ step: '0.01' }} />
          <Button type="submit" variant="contained" color="primary" disabled={submitting}>
            {submitting ? <CircularProgress size={24} /> : 'Adicionar'}
          </Button>
        </form>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} component={motion.div} initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>{product.name}</Typography>
                    <Typography color="text.secondary">Preço: R$ {Number(product.price).toFixed(2)}</Typography>
                  </CardContent>
                  <CardActions>
                    {/* Botão de remover pode ser adicionado aqui futuramente */}
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
