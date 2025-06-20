import React, { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../../services/api/settingsApi';
import { toast } from 'react-toastify';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from '@mui/material';

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        setSettings(res.data.data);
        setFormValues(res.data.data);
      } catch (err) {
        toast.error('Failed to load settings');
      }
    };
    fetchSettings();
  }, []);

  const handleEdit = (field) => setEditingField(field);
  const handleChange = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value });
  const handleSave = async (field) => {
    try {
      const res = await updateSettings({ [field]: formValues[field] });
      toast.success(res.message || 'Updated successfully');
      setSettings(res.data);
      setEditingField(null);
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const generalFields = ['email', 'contactNumber', 'location'];
  const socialFields = ['instagramUrl', 'tiktokUrl', 'facebookUrl'];

  if (!settings) return <Typography align="center" mt={10}>Loading...</Typography>;

  const renderFields = (fields) =>
    fields.map((field) => (
      <Box key={field} display="flex" alignItems="center" gap={2} mb={2}>
        {editingField === field ? (
          <>
            <TextField
              label={field.replace(/([A-Z])/g, ' $1')}
              name={field}
              value={formValues[field] || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <Button variant="contained" color="success" onClick={() => handleSave(field)}>Save</Button>
            <Button variant="outlined" onClick={() => setEditingField(null)}>Cancel</Button>
          </>
        ) : (
          <>
            <Typography variant="body2" sx={{ flex: 1 }}>
              <strong>{field.replace(/([A-Z])/g, ' $1')}:</strong> {settings[field] || 'Not set'}
            </Typography>
            <Button variant="contained" onClick={() => handleEdit(field)}>Edit</Button>
          </>
        )}
      </Box>
    ));

  return (
    <Paper elevation={3} sx={{ maxWidth: 700, mx: 'auto', mt: 5, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Business Settings
      </Typography>

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="General" />
        <Tab label="Social Media" />
      </Tabs>

      <Divider sx={{ mb: 3 }} />

      {activeTab === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>General Information</Typography>
          {renderFields(generalFields)}
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>Social Media Links</Typography>
          {renderFields(socialFields)}
        </Box>
      )}
    </Paper>
  );
};

export default AdminSettingsPage;
