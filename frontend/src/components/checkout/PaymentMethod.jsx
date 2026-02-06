import React from 'react';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';

const PaymentMethod = ({ selectedMethod, onSelectMethod }) => {
  const paymentOptions = [
    {
      id: 'cod',
      icon: Banknote,
      label: 'Cash on Delivery',
      description: 'Pay when your order arrives at your doorstep'
    },
    {
      id: 'upi',
      icon: Smartphone,
      label: 'UPI Payment',
      description: 'Fast and secure payment via UPI'
    },
    {
      id: 'card',
      icon: CreditCard,
      label: 'Debit Card',
      description: 'Pay securely using your debit card'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Payment Method</h3>
        <p className="text-gray-600">Choose how you'd like to pay for your order</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedMethod === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onSelectMethod(option.id)}
              className={`p-6 rounded-lg border-2 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
              type="button"
            >
              <div className="flex flex-col items-start space-y-3">
                <div
                  className={`p-3 rounded-lg ${
                    isSelected ? 'bg-blue-200' : 'bg-gray-100'
                  }`}
                >
                  <Icon
                    size={32}
                    className={isSelected ? 'text-blue-600' : 'text-gray-600'}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">{option.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {option.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                <div className="mt-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
