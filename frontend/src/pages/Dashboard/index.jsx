import React, { useState, useEffect, useMemo } from 'react';
import {
  Container, Typography, Box, Paper, Stack, TextField, CircularProgress, Grid
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import api from '../../services/api';
import './styles.css';

const PIE_COLORS = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

export default function Dashboard({ showNotification }) {
  const [monthStr, setMonthStr] = useState(() => new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });

  useEffect(() => {
    fetchData();
  }, [monthStr]);

  const fetchData = async () => {
    if (!monthStr) return;
    const [year, month] = monthStr.split('-');
    const lastDay = new Date(year, month, 0).getDate();
    const from = `${year}-${month}-01`;
    const to = `${year}-${month}-${lastDay}`;

    setLoading(true);
    try {
      const [resList, resSummary] = await Promise.all([
        api.get('/transactions', { params: { from, to } }),
        api.get('/transactions/summary', { params: { from, to } })
      ]);
      setTransactions(resList.data);
      setSummary(resSummary.data);
    } catch (e) {
      console.error('Erro ao buscar dados do dashboard:', e);
      showNotification && showNotification('Erro ao carregar os dados do painel.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return '';
    const [, month, day] = dateStr.split('-');
    return `${day}/${month}`;
  };

  // Process data for Bar Chart (Daily Income/Expense)
  const barChartData = useMemo(() => {
    const dailyData = {};
    transactions.forEach(t => {
      if (!dailyData[t.date]) {
        dailyData[t.date] = { date: t.date, label: formatDateLabel(t.date), Receitas: 0, Despesas: 0 };
      }
      if (t.type === 'income') dailyData[t.date].Receitas += t.amount;
      else dailyData[t.date].Despesas += t.amount;
    });
    return Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions]);

  // Process data for Pie Chart (Expenses by Category)
  const pieChartData = useMemo(() => {
    const categoryData = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      const cat = t.category ? t.category.charAt(0).toUpperCase() + t.category.slice(1) : 'Outros';
      if (!categoryData[cat]) categoryData[cat] = 0;
      categoryData[cat] += t.amount;
    });
    return Object.keys(categoryData).map(key => ({ name: key, value: categoryData[key] })).sort((a,b) => b.value - a.value);
  }, [transactions]);

  return (
    <Container className="dashboard" maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Dashboard Financeiro</Typography>
          <Typography variant="body2" color="text.secondary">
            Visão geral das suas finanças no mês selecionado.
          </Typography>
        </Box>
        <TextField
          size="small"
          type="month"
          value={monthStr}
          onChange={(e) => setMonthStr(e.target.value)}
          sx={{ width: 180 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
            <Paper variant="outlined" sx={{ p: 2, flex: 1, borderTop: 4, borderColor: 'success.main' }}>
              <Typography variant="body2" color="text.secondary">Total de Receitas</Typography>
              <Typography variant="h5" color="success.main" sx={{ fontWeight: 700 }}>
                {formatCurrency(summary.income)}
              </Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, flex: 1, borderTop: 4, borderColor: 'error.main' }}>
              <Typography variant="body2" color="text.secondary">Total de Despesas</Typography>
              <Typography variant="h5" color="error.main" sx={{ fontWeight: 700 }}>
                {formatCurrency(summary.expense)}
              </Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, flex: 1, borderTop: 4, borderColor: 'primary.main' }}>
              <Typography variant="body2" color="text.secondary">Saldo do Mês</Typography>
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
                {formatCurrency(summary.balance)}
              </Typography>
            </Paper>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper variant="outlined" sx={{ p: 2, height: 400 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Fluxo Diário</Typography>
                {barChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={barChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="label" fontSize={12} tickMargin={5} />
                      <YAxis fontSize={12} tickFormatter={(value) => `R$ ${value}`} />
                      <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="Receitas" fill="#4caf50" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Despesas" fill="#f44336" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box display="flex" alignItems="center" justifyContent="center" height="80%">
                    <Typography color="text.secondary">Sem dados para este mês.</Typography>
                  </Box>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, height: 400 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Despesas por Categoria</Typography>
                {pieChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Box display="flex" alignItems="center" justifyContent="center" height="80%">
                    <Typography color="text.secondary">Sem despesas neste mês.</Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}