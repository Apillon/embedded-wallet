import SettingsMenuItem from './SettingsMenuItem';

export default () => {
  const items = [
    // {
    //   title: 'General',
    //   screen: 'settingsGeneral' as const,
    // },
    {
      title: 'Export private key',
      screen: 'exportPrivateKey' as const,
    },
    {
      title: 'Import private key',
      screen: 'importAccount' as const,
    },
  ];

  return (
    <div className="flex flex-col pt-10 gap-3 min-h-full">
      {items.map((item, index) => (
        <SettingsMenuItem key={index} {...item} />
      ))}
    </div>
  );
};
