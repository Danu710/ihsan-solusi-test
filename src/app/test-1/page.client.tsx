'use client';
import { useEffect, useState } from 'react';
import { PageProvider, usePageContext } from './page.provider';

const convertType = [
  { id: 1, type: 'Decimal' },
  { id: 2, type: 'Binnary' },
  { id: 8, type: 'Octa' },
  { id: 16, type: 'Hexa' },
];

function InterPage() {
  const { state, action } = usePageContext();
  return (
    <>
      <div className='mb-4 border-b border-solid py-2'>
        <h1 className='text-xl font-bold '>Binnary converter</h1>
      </div>
      <div>
        <div className='flex space-x-5'>
          <div> Converter from </div>
          <select
            value={state.fromType}
            onChange={(e) => action.setFromType(parseInt(e.target.value))}>
            {convertType.map((f, _) => (
              <option key={_} value={f.id}>
                {' '}
                {f.type}{' '}
              </option>
            ))}
          </select>
          <div>to</div>
          <select
            value={state.toType}
            onChange={(e) => action.setToType(parseInt(e.target.value))}>
            {convertType.map((f, _) => (
              <option key={_} value={f.id}>
                {f.type}{' '}
              </option>
            ))}
          </select>
        </div>

        <div className='flex mt-3 space-x-2'>
          <div>
            <label>From</label>
            <input
              placeholder='from'
              className='px-2 rounded py-1 w-full border boder-solid border-gray-300 focus:outline-blue-500'
              value={state.fromValue}
              onChange={(e) => action.setFromValue(e.target.value)}
            />
          </div>
          <div>
            <label>Result</label>
            <input
              placeholder='this result of converter'
              value={state.result}
              disabled
              className='px-2 rounded py-1 w-full border boder-solid border-gray-300 focus:outline-blue-500'
            />
          </div>

          <div className='flex items-end'>
            <button
              className='py-1 w-full px-2 border border-solid border-blue-500 hover:bg-blue-400 active:bg-blue-500 rounded-md bg-blue-500 text-white '
              onClick={action.convert}>
              Convert
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ClientPage(props: any) {
  return (
    <PageProvider>
      <InterPage {...props} />
    </PageProvider>
  );
}
