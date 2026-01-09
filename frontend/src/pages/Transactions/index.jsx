import React, { useMemo, useState } from 'react';
import {
  Container,
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  Button,
  Collapse,
  Stack,
  TextField,
  IconButton,
  Divider,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import './styles.css';

const emptyRow = { amount: '', date: '', category: '', description: '' };

export default function Transactions() {
  const [tab, setTab] = useState('income'); // income | expense
  const [openForm, setOpenForm] = useState(false);
  const [rows, setRows] = useState([{ ...emptyRow }]);

  const title = useMemo(() => (tab === 'income' ? 'Receitas' : 'Despesas'), [tab]);
  const addLabel = useMemo(() => (tab === 'income' ? 'Adicionar Receita' : 'Adicionar Despesa'), [tab]);

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
    // TODO: integrar com POST /api/transactions
    console.log('Salvar', { type: tab, items: rows });
    setRows([{ ...emptyRow }]);
    setOpenForm(false);
  };

  return (
    <Container className="transactions" maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Gerenciador de Transações</Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Lance suas {title.toLowerCase()} e visualize abaixo.
      </Typography>

      <Paper variant="outlined" sx={{ mb: 2 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
        >
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
                    size="small"
                    label="Valor"
                    type="number"
                    value={row.amount}
                    onChange={e => handleRowChange(i, 'amount', e.target.value)}
                    fullWidth
                    inputProps={{ min: 0, step: '0.01' }}
                  />
                  <TextField
                    size="small"
                    label="Data"
                    type="date"
                    value={row.date}
                    onChange={e => handleRowChange(i, 'date', e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <Select
                    size="small"
                    value={row.category}
                    displayEmpty
                    onChange={e => handleRowChange(i, 'category', e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="">{tab === 'income' ? 'Categoria da receita' : 'Categoria da despesa'}</MenuItem>
                    {tab === 'income' ? (
                      <>
                        <MenuItem value="salario">Salário</MenuItem>
                        <MenuItem value="freelance">Freelance</MenuItem>
                        <MenuItem value="investimentos">Investimentos</MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem value="alimentacao">Alimentação</MenuItem>
                        <MenuItem value="moradia">Moradia</MenuItem>
                        <MenuItem value="transporte">Transporte</MenuItem>
                      </>
                    )}
                  </Select>
                  <TextField
                    size="small"
                    label="Descrição"
                    value={row.description}
                    onChange={e => handleRowChange(i, 'description', e.target.value)}
                    fullWidth
                  />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton size="small" color="primary" onClick={handleAddRow} aria-label="adicionar linha">
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveRow(i)}
                      aria-label="remover linha"
                      disabled={rows.length === 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button size="small" variant="outlined" onClick={() => setOpenForm(false)}>Cancelar</Button>
            <Button size="small" variant="contained" onClick={handleSave}>
              Salvar {rows.length} {rows.length > 1 ? 'itens' : 'item'}
            </Button>
          </Box>
        </Paper>
      </Collapse>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>Lista de Transações</Typography>
        <Typography variant="body2" color="text.secondary">
          Em breve: tabela com filtros de período, categoria e busca.
        </Typography>
      </Paper>
    </Container>
  );
}