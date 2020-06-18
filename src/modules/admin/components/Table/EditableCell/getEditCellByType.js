import React from 'react';
import EditAgeCell from './EditAgeCell';
import EditDefaultCell from './EditDefaultCell';

const getEditCellByType = (type) => {
  switch (type) {
    case 'age': {
      return (props) => <EditAgeCell {...props} />;
    }
    case 'aboutInfo': {
      return (props) => <EditDefaultCell {...props} multiline={5} />;
    }
    case 'isActive':
    case 'id': return () => null
    default: {
      return (props) => {
        return <EditDefaultCell {...props} />
      };
    }
  }
}
export default getEditCellByType;
