import React, { useMemo, useState, useEffect } from 'react';
import {
  Container, Box, Tabs, Tab, Paper, Typography, Button, Collapse, Stack, TextField,
  IconButton, Divider, Select, MenuItem, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import api from '../../services/api';
import './styles.css';

const emptyRow = { amount: '', date: '', category: '', description: '' };

export default function Transactions({ showNotification }) {
  const [tab, setTab] = useState('income'); // income | expense
  const [openForm, setOpenForm] = useState(false);
  const [rows, setRows] = useState([{ ...emptyRow }]);

  // Filters and Data State
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loadingList, setLoadingList] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [filters, setFilters] = useState({
    type: 'all',
    search: '',
    from: '',
    to: ''
  });

  // Edit State
  const [editingItem, setEditingItem] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const title = useMemo(() => (tab === 'income' ? 'Receitas' : 'Despesas'), [tab]);
  const addLabel = useMemo(() => (tab === 'income' ? 'Adicionar Receita' : 'Adicionar Despesa'), [tab]);

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoadingList(true);
      const [resList, resSummary] = await Promise.all([
        api.get('/transactions', { params: filters }),
        api.get('/transactions/summary', { params: filters })
      ]);
      setTransactions(resList.data);
      setSummary(resSummary.data);
    } catch (e) {
      console.error('Erro ao buscar transações', e);
      showNotification && showNotification('Erro ao carregar lista de transações', 'error');
    } finally {
      setLoadingList(false);
    }
  };

  const handleTabChange = (_e, value) => {
    setTab(value);
    setOpenForm(false);
    setRows([{ ...emptyRow }]);
  };

  const handleRowChange = (i, field, value) => {
    setRows(prev => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };

  const handleAddRow = () => setRows(prev => [...prev, { ...emptyRow }]);
  const handleRemoveRow = (i) => setRows(prev => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i)));

  const handleSave = async () => {
    const validRows = rows.filter(r => r.amount && r.date);
    if (validRows.length === 0) {
      showNotification && showNotification('Preencha os campos obrigatórios (Valor e Data).', 'warning');
      return;
    }

    try {
      setIsSaving(true);
      await api.post('/transactions', { type: tab, items: validRows });
      showNotification && showNotification('Transações salvas com sucesso!');
      setRows([{ ...emptyRow }]);
      setOpenForm(false);
      fetchTransactions();
    } catch (e) {
      console.error('Erro ao salvar', e);
      showNotification && showNotification(e.response?.data?.error || 'Erro ao salvar as transações', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      showNotification && showNotification('Transação excluída com sucesso!', 'success');
      fetchTransactions();
    } catch (e) {
      console.error('Erro ao excluir', e);
      showNotification && showNotification('Erro ao excluir a transação.', 'error');
    }
  };

  const openEditModal = (transaction) => {
    setEditingItem({ ...transaction });
  };

  const closeEditModal = () => {
    setEditingItem(null);
  };

  const handleEditSave = async () => {
    if (!editingItem.amount || !editingItem.date) {
      showNotification && showNotification('Preencha os campos obrigatórios (Valor e Data).', 'warning');
      return;
    }

    try {
      setIsSavingEdit(true);
      await api.put(`/transactions/${editingItem.id}`, editingItem);
      showNotification && showNotification('Transação atualizada com sucesso!');
      closeEditModal();
      fetchTransactions();
    } catch (e) {
      console.error('Erro ao atualizar', e);
      showNotification && showNotification(e.response?.data?.error || 'Erro ao atualizar a transação', 'error');
    } finally {
      setIsSavingEdit(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <Container className="transactions" maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Gerenciador de Transações</Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Lance suas receitas e despesas e visualize o balanço abaixo.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <Paper variant="outlined" sx={{ p: 2, flex: 1, borderTop: 4, borderColor: 'success.main' }}>
          <Typography variant="body2" color="text.secondary">Total de Receitas</Typography>
          <Typography variant="h6" color="success.main" sx={{ fontWeight: 700 }}>
            {formatCurrency(summary.income)}
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, flex: 1, borderTop: 4, borderColor: 'error.main' }}>
          <Typography variant="body2" color="text.secondary">Total de Despesas</Typography>
          <Typography variant="h6" color="error.main" sx={{ fontWeight: 700 }}>
            {formatCurrency(summary.expense)}
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, flex: 1, borderTop: 4, borderColor: 'primary.main' }}>
          <Typography variant="body2" color="text.secondary">Saldo Atual</Typography>
          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
            {formatCurrency(summary.balance)}
          </Typography>
        </Paper>
      </Stack>

      <Paper variant="outlined" sx={{ mb: 2 }}>
        <Tabs value={tab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" variant="fullWidth">
          <Tab value="income" label="Receitas" />
          <Tab value="expense" label="Despesas" />
        </Tabs>
      </Paper>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button size="small" variant="contained" onClick={() => setOpenForm(v => !v)}>
          {openForm ? 'Ocultar' : addLabel}
        </Button>
      </Box>

      <Collapse in={openForm} unmountOnExit>
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            {title} selecionadas ({rows.length})
          </Typography>

          <Stack spacing={2}>
            {rows.map((row, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 2 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    size="small" label="Valor*" type="number"
                    value={row.amount} onChange={e => handleRowChange(i, 'amount', e.target.value)}
                    fullWidth inputProps={{ min: 0, step: '0.01' }}
                  />
                  <TextField
                    size="small" label="Data*" type="date"
                    value={row.date} onChange={e => handleRowChange(i, 'date', e.target.value)}
                    fullWidth InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    select size="small"
                    label={tab === 'income' ? 'Categoria da receita' : 'Categoria da despesa'}
                    value={row.category}
                    onChange={e => handleRowChange(i, 'category', e.target.value)}
                    fullWidth
                  >
                    <MenuItem value=""><em>Nenhuma</em></MenuItem>
                    {tab === 'income' ? [
                      <MenuItem key="salario" value="salario">Salário</MenuItem>,
                      <MenuItem key="freelance" value="freelance">Freelance</MenuItem>,
                      <MenuItem key="investimentos" value="investimentos">Investimentos</MenuItem>
                    ] : [
                      <MenuItem key="alimentacao" value="alimentacao">Alimentação</MenuItem>,
                      <MenuItem key="moradia" value="moradia">Moradia</MenuItem>,
                      <MenuItem key="transporte" value="transporte">Transporte</MenuItem>
                    ]}
                  </TextField>
                  <TextField
                    size="small" label="Descrição"
                    value={row.description} onChange={e => handleRowChange(i, 'description', e.target.value)}
                    fullWidth
                  />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton size="small" color="primary" onClick={handleAddRow}><AddIcon /></IconButton>
                    <IconButton size="small" color="error" onClick={() => handleRemoveRow(i)} disabled={rows.length === 1}><RemoveIcon /></IconButton>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button size="small" variant="outlined" onClick={() => setOpenForm(false)}>Cancelar</Button>
            <Button size="small" variant="contained" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Salvando...' : `Salvar ${rows.length} ${rows.length > 1 ? 'itens' : 'item'}`}
            </Button>
          </Box>
        </Paper>
      </Collapse>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Filtros</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField size="small" label="Buscar (Descrição ou Categoria)" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} fullWidth />
          <Select size="small" value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)} sx={{ minWidth: 150 }}>
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="income">Receitas</MenuItem>
            <MenuItem value="expense">Despesas</MenuItem>
          </Select>
          <TextField size="small" label="De" type="date" value={filters.from} onChange={(e) => handleFilterChange('from', e.target.value)} InputLabelProps={{ shrink: true }} fullWidth />
          <TextField size="small" label="Até" type="date" value={filters.to} onChange={(e) => handleFilterChange('to', e.target.value)} InputLabelProps={{ shrink: true }} fullWidth />
        </Stack>
      </Paper>

      <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 500 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Data</strong></TableCell>
              <TableCell><strong>Categoria</strong></TableCell>
              <TableCell><strong>Descrição</strong></TableCell>
              <TableCell align="right"><strong>Valor</strong></TableCell>
              <TableCell align="center" sx={{ width: 100 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingList ? (
              <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4 }}><CircularProgress size={30} /></TableCell></TableRow>
            ) : transactions.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>Nenhuma transação encontrada.</TableCell></TableRow>
            ) : (
              transactions.map((t) => (
                <TableRow 
                  key={t.id} 
                  hover
                  sx={{
                    '& .actions': { opacity: 0, transition: 'opacity 0.2s' },
                    '&:hover .actions': { opacity: 1 }
                  }}
                >
                  <TableCell>{formatDate(t.date)}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{t.category || '-'}</TableCell>
                  <TableCell>{t.description || '-'}</TableCell>
                  <TableCell align="right" sx={{ color: t.type === 'income' ? 'success.main' : 'error.main', fontWeight: 600 }}>
                    {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                  </TableCell>
                  <TableCell align="center" className="actions">
                    <IconButton size="small" color="primary" onClick={() => openEditModal(t)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(t.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={!!editingItem} onClose={closeEditModal} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Transação</DialogTitle>
        <DialogContent dividers>
          {editingItem && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                size="small" label="Valor*" type="number"
                value={editingItem.amount} onChange={e => setEditingItem({...editingItem, amount: e.target.value})}
                fullWidth inputProps={{ min: 0, step: '0.01' }}
              />
              <TextField
                size="small" label="Data*" type="date"
                value={editingItem.date} onChange={e => setEditingItem({...editingItem, date: e.target.value})}
                fullWidth InputLabelProps={{ shrink: true }}
              />
              <TextField
                select size="small" label={editingItem.type === 'income' ? 'Categoria da receita' : 'Categoria da despesa'}
                value={editingItem.category || ''}
                onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                fullWidth
              >
                <MenuItem value=""><em>Nenhuma</em></MenuItem>
                {editingItem.type === 'income' ? [
                  <MenuItem key="salario" value="salario">Salário</MenuItem>,
                  <MenuItem key="freelance" value="freelance">Freelance</MenuItem>,
                  <MenuItem key="investimentos" value="investimentos">Investimentos</MenuItem>
                ] : [
                  <MenuItem key="alimentacao" value="alimentacao">Alimentação</MenuItem>,
                  <MenuItem key="moradia" value="moradia">Moradia</MenuItem>,
                  <MenuItem key="transporte" value="transporte">Transporte</MenuItem>
                ]}
              </TextField>
              <TextField
                size="small" label="Descrição"
                value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                fullWidth
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal} color="inherit">Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained" disabled={isSavingEdit}>
            {isSavingEdit ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}