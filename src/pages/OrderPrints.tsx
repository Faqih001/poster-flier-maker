
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const OrderPrints = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDesign = location.state?.design;

  const [orderData, setOrderData] = useState({
    size: '',
    quantity: 1,
    deliveryAddress: '',
    phone: '',
    notes: ''
  });

  const sizes = [
    { value: 'a4', label: 'A4 (21cm x 29.7cm)', price: 150 },
    { value: 'a3', label: 'A3 (29.7cm x 42cm)', price: 300 },
    { value: 'a2', label: 'A2 (42cm x 59.4cm)', price: 600 }
  ];

  const selectedSize = sizes.find(s => s.value === orderData.size);
  const totalPrice = selectedSize ? selectedSize.price * orderData.quantity : 0;

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Sign In Required</h1>
            <p className="text-xl mb-8">Please sign in to order prints</p>
            <Button
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Sign In
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Order Prints</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Print Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedDesign && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="font-medium">Selected Design:</p>
                      <p className="text-sm text-gray-600">{selectedDesign.title}</p>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="size">Paper Size</Label>
                    <Select value={orderData.size} onValueChange={(value) => setOrderData({...orderData, size: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select paper size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label} - KES {size.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max="100"
                      value={orderData.quantity}
                      onChange={(e) => setOrderData({...orderData, quantity: parseInt(e.target.value) || 1})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254..."
                      value={orderData.phone}
                      onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your delivery address"
                      value={orderData.deliveryAddress}
                      onChange={(e) => setOrderData({...orderData, deliveryAddress: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions for printing or delivery"
                      value={orderData.notes}
                      onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedSize && (
                    <>
                      <div className="flex justify-between">
                        <span>{selectedSize.label}</span>
                        <span>KES {selectedSize.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity</span>
                        <span>{orderData.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>KES 200</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>KES {totalPrice + 200}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-3 mt-6">
                    <Badge className="w-full justify-center bg-green-100 text-green-800">
                      ✓ High-quality printing
                    </Badge>
                    <Badge className="w-full justify-center bg-green-100 text-green-800">
                      ✓ Fast delivery (2-3 days)
                    </Badge>
                    <Badge className="w-full justify-center bg-green-100 text-green-800">
                      ✓ Satisfaction guaranteed
                    </Badge>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    disabled={!orderData.size || !orderData.deliveryAddress || !orderData.phone}
                  >
                    Place Order - KES {totalPrice + 200}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Payment via M-Pesa, Card, or PayPal
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPrints;
