import React from 'react';

function UnauthorizedCard(props) {
  return (
    <form className="card flex-col mb-2 mt-8">
      <button type="submit" className="px-4 py-2 my-2 text-white bg-custom-blue font-medium rounded-lg text-base w-full text-center">Войти</button>
      <button type="click" className="px-4 py-2 my-2 text-white bg-custom-blue font-medium rounded-lg text-base w-full text-center">Зарегистрироваться</button>
    </form>
  );
}

export default UnauthorizedCard;