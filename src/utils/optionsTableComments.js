const columns = [
    {
      name: "picture",
      label: "Photo de profil",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <img
            src={value}
            alt='avatar'
            style={{ width: 80, height: 80 }} />
        )
      },
    },
    {
      name: "pseudo",
      label: "Pseudo",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "email",
      label: "Mail",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "bio",
      label: "Bio",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: 'isBlocked',
      label: "Statut",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Chip 
            label={value ? "Bloqué" : "Autorisé"} 
            color={value ? "secondary" : "primary"} 
          />
        )
      }
    },
    {
      name: "uid",
      options: {
        display: false
      }
    }
  ];