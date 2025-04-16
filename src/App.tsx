import React, { useState } from 'react';
import './App.css';

type ParamTypes = 'string';

interface Param<ParamTypes> {
  id: number;
  name: string;
  type: ParamTypes;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  name: string;
  paramValues: ParamValue[];
}

interface ParamsEditorProps {
  params: Param<string>[];
  model: Model;
}

const defaultParams: Param<string>[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  }
];

const defaultModel: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное'
    },
    {
      paramId: 2,
      value: 'макси'
    }
  ],
  name: 'Тестовая модель №1'
};


function ParamsEditor({ params, model }: ParamsEditorProps) {
  const { name: modelName, paramValues } = model;
  const [myParamValues, setMyParamValues] = useState<ParamValue[]>(paramValues);

  const getParamValue = (id: number) => {
    return paramValues.filter(({ paramId }) => paramId === id)[0]?.value;
  };

  const updateParam = (id: number, newValue: string) => {
    setMyParamValues(myParamValues.map(param => {
      if (param.paramId === id) {
        param.value = newValue;
      }
      return param;
    }))
  };

  const getModel = (): Model => {
    return model;
  }

  return (
    <>
      <header>{modelName}</header>
      <div className='paramsColumn'>
        {params.map(({ id, name, type }) =>
        (<label key={id} htmlFor={name} className='param'>
          <p>{name}</p>
          <input
            className='inputField'
            type={type}
            name={name}
            value={getParamValue(id)}
            onChange={e => updateParam(id, e.target.value)} />
        </label>)
        )}
      </div>
      <code>{JSON.stringify(model)}</code>
    </>
  );
}

function App() {
  return (
    <div className='App'>
      <ParamsEditor
        params={defaultParams}
        model={defaultModel}
      />
    </div>
  );
}

export default App;
