import React, { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../../services/api/settingsApi';
import { toast } from 'react-toastify';


const AdminSettingsDashboard = () => {
  const [settings, setSettings] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [showSocials, setShowSocials] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        setSettings(res.data);
        setFormValues(res.data);
      } catch (err) {
        toast.error('Failed to load settings');
      }
    };
    fetchSettings();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

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

  if (!settings) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Card className="max-w-3xl mx-auto mt-10 p-6 shadow-md space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Business Settings</h2>

      {/* General Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">General</h3>

        {['email', 'contactNumber', 'location'].map((field) => (
          <div key={field} className="flex items-center gap-4">
            {editingField === field ? (
              <>
                <Input
                  name={field}
                  value={formValues[field]}
                  onChange={handleChange}
                  className="flex-1"
                />
                <Button onClick={() => handleSave(field)} size="sm">Save</Button>
                <Button variant="ghost" onClick={() => setEditingField(null)} size="sm">Cancel</Button>
              </>
            ) : (
              <>
                <p className="flex-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}: {settings[field]}</p>
                <Button onClick={() => handleEdit(field)} size="sm">Edit</Button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Social Section Toggle */}
      <div className="mt-6">
        <Button variant="outline" onClick={() => setShowSocials(!showSocials)}>
          {showSocials ? 'Hide' : 'Show'} Social Media Links
        </Button>

        {showSocials && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Socials</h3>
            {['instagramUrl', 'tiktokUrl', 'facebookUrl'].map((field) => (
              <div key={field} className="flex items-center gap-4">
                {editingField === field ? (
                  <>
                    <Input
                      name={field}
                      value={formValues[field]}
                      onChange={handleChange}
                      className="flex-1"
                    />
                    <Button onClick={() => handleSave(field)} size="sm">Save</Button>
                    <Button variant="ghost" onClick={() => setEditingField(null)} size="sm">Cancel</Button>
                  </>
                ) : (
                  <>
                    <p className="flex-1 capitalize">{field.replace('Url', '').replace(/([A-Z])/g, ' $1')}: {settings[field] || 'Not set'}</p>
                    <Button onClick={() => handleEdit(field)} size="sm">Edit</Button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AdminSettingsDashboard;
