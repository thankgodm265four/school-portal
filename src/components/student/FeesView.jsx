import React from 'react';
import { Card, Badge, Button } from '../ui/Components';
import { feeStructure, feePayments } from '../../data/mockData';
import { formatCurrency, calculatePaymentPercentage, getFeeStatusBadge } from '../../utils/helpers';

export default function FeesView() {
    const payment = feePayments[0]; // Current student's payment
    const percentage = calculatePaymentPercentage(payment.amountPaid, feeStructure.total);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">School Fees</h1>
                    <p className="text-neutral-500 mt-1">{feeStructure.session} • {feeStructure.term}</p>
                </div>
                {payment.receiptNumber && (
                    <Button variant="outline">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Receipt
                    </Button>
                )}
            </div>

            {/* Payment Status Banner */}
            <div className={`card p-6 border-0 ${payment.status === 'Paid'
                    ? 'bg-gradient-to-r from-success-500 to-success-700 text-white'
                    : payment.status === 'Partial'
                        ? 'bg-gradient-to-r from-warning-500 to-secondary-600 text-white'
                        : 'bg-gradient-to-r from-danger-500 to-danger-700 text-white'
                }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            {payment.status === 'Paid' ? (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {payment.status === 'Paid' ? 'Fully Paid' : payment.status === 'Partial' ? 'Partially Paid' : 'Payment Pending'}
                                </h2>
                                <p className="text-white/80">
                                    {payment.status === 'Paid'
                                        ? `Paid on ${payment.paymentDate}`
                                        : `Outstanding: ${formatCurrency(payment.amountDue)}`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white/80 text-sm">Total Fees</p>
                        <p className="text-3xl font-bold">{formatCurrency(feeStructure.total)}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                {payment.status !== 'Unpaid' && (
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Payment Progress</span>
                            <span>{percentage}%</span>
                        </div>
                        <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Fee Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card title="Fee Breakdown" subtitle={feeStructure.term}>
                    <div className="space-y-3">
                        {feeStructure.items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                            >
                                <span className="text-neutral-700 dark:text-neutral-300">{item.name}</span>
                                <span className="font-semibold text-neutral-900 dark:text-white">
                                    {formatCurrency(item.amount)}
                                </span>
                            </div>
                        ))}
                        <div className="flex items-center justify-between py-3 mt-2 border-t-2 border-neutral-200 dark:border-neutral-700">
                            <span className="font-bold text-neutral-900 dark:text-white">Total</span>
                            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                                {formatCurrency(feeStructure.total)}
                            </span>
                        </div>
                    </div>
                </Card>

                <Card title="Payment Summary">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-success-50 dark:bg-success-600/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-success-100 dark:bg-success-600/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-medium text-success-700 dark:text-success-400">Amount Paid</span>
                            </div>
                            <span className="text-xl font-bold text-success-600">{formatCurrency(payment.amountPaid)}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-danger-50 dark:bg-danger-600/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-danger-100 dark:bg-danger-600/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="font-medium text-danger-700 dark:text-danger-400">Outstanding</span>
                            </div>
                            <span className="text-xl font-bold text-danger-600">{formatCurrency(payment.amountDue)}</span>
                        </div>

                        {payment.receiptNumber && (
                            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                                <p className="text-sm text-neutral-500 mb-1">Receipt Number</p>
                                <p className="font-mono font-semibold text-neutral-900 dark:text-white">{payment.receiptNumber}</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Payment History (placeholder for future) */}
            <Card title="Payment History">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Receipt No.</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payment.paymentDate && (
                                <tr>
                                    <td>{payment.paymentDate}</td>
                                    <td className="font-mono">{payment.receiptNumber}</td>
                                    <td className="font-semibold">{formatCurrency(payment.amountPaid)}</td>
                                    <td>Bank Transfer</td>
                                    <td><Badge variant="success">Confirmed</Badge></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
