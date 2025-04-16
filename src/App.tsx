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
  getModel: (model: Model) => void;
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


function ParamsEditor({ params, model, getModel }: ParamsEditorProps) {
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
      <button onClick={() => getModel(model)}>Press</button>
      <code>{JSON.stringify(model)}</code>
    </>
  );
}

function App() {
  const getModel = (e: Model) => console.log(e);

  return (
    <div className='App'>
      <ParamsEditor
        params={defaultParams}
        model={defaultModel}
        getModel={(e) => getModel(e)}
      />
    </div>
  );
}

export default App;
