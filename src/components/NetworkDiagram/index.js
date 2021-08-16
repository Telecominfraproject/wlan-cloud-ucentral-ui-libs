import React from 'react';
import PropTypes from 'prop-types';
import ReactFlow, { removeElements, MiniMap, Controls, Background } from 'react-flow-renderer';

const NetworkDiagram = ({ elements, setElements }) => {
  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        snapToGrid
        defaultPosition={[450, 200]}
        snapGrid={[20, 20]}
      >
        <MiniMap
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;

            return '#fff';
          }}
          nodeBorderRadius={5}
        />
        <Controls />
        <Background color="#aaa" gap={20} />
      </ReactFlow>
    </div>
  );
};

NetworkDiagram.propTypes = {
  elements: PropTypes.instanceOf(Array).isRequired,
  setElements: PropTypes.func.isRequired,
};

export default React.memo(NetworkDiagram);
