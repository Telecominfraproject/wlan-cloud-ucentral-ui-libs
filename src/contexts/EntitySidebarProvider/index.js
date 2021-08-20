import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EntitySidebarContext = React.createContext();

export const EntitySidebarProvider = ({ selectedEntity, children }) => {
  const [entity, setEntity] = useState(selectedEntity);

  return (
    <EntitySidebarContext.Provider value={{ entity, setEntity }}>
      {children}
    </EntitySidebarContext.Provider>
  );
};

EntitySidebarProvider.propTypes = {
  selectedEntity: PropTypes.instanceOf(Object),
  children: PropTypes.node.isRequired,
};

EntitySidebarProvider.defaultProps = {
  selectedEntity: null,
};

export const useEntity = () => React.useContext(EntitySidebarContext);
