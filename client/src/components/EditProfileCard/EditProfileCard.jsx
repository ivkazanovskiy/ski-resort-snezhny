import React from 'react';

function EditProfileCard(props) {
  return (
    <form className="py-4 border border-gray-300 rounded-lg p-2">
                  <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Изменить имя</label>
                    <input name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {(true) ?
                      <span className="block mb-2 text-sm font-medium text-green-500 ">Имя</span>
                      :
                      <span className="block mb-2 text-sm font-medium text-red-500">Имя должно быть короче 20 букв</span>
                    }
                  </div>
                  <div className="mb-6">
                    <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 ">Фамилия</label>
                    <input name="surname" type="text" id="surname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {(true) ?
                      <span className="block mb-2 text-sm font-medium text-green-500 ">Корректная фамилия</span>
                      :
                      <span className="block mb-2 text-sm font-medium text-red-500">Фамилия должна быть короче 20 букв</span>
                    }
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Электронная почта</label>
                    <input name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="name@mail.com" />
                    {(true) ?
                      <span className="block mb-2 text-sm font-medium text-green-500 ">Корректная почта</span>
                      :
                      <span className="block mb-2 text-sm font-medium text-red-500 ">Почта указана некорректно</span>
                    }
                  </div>
                  <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Пароль</label>
                    <input name="password" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {(true) ?
                      <span className="block mb-2 text-sm font-medium text-green-500 ">Корректный пароль</span>
                      :
                      <span className="block mb-2 text-sm font-medium text-red-500 ">Пароль должен содержать от 3 до 20 букв верхнего и нижнего регистра и цифр</span>
                    }
                  </div>
                  <div className="mb-6">
                    <label htmlFor="passwordRepeat" className="block mb-2 text-sm font-medium text-gray-900 ">Повторите пароль</label>
                    <input name="passwordRepeat" type="password" id="passwordRepeat" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {(true) ?
                      <span className="block mb-2 text-sm font-medium text-green-500 ">Пароли совпадают</span>
                      :
                      <span className="block mb-2 text-sm font-medium text-red-500 ">Пароли не совпадают</span>
                    }
                  </div>
                  <div className="mb-6">
                    <label htmlFor="skiPass" className="block mb-2 text-sm font-medium text-gray-900 ">Номер ски-пасс</label>
                    <input name="skiPass" type="text" id="skiPass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {(true) ?
                      <span className="block mb-2 text-sm font-medium text-green-500 ">Пароли совпадают</span>
                      :
                      <span className="block mb-2 text-sm font-medium text-red-500 ">Пароли не совпадают</span>
                    }
                  </div>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Изменить информацию</button>
                </form>
  );
}

export default EditProfileCard;