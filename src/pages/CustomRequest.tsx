
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, Upload, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CustomRequest = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: 1,
    budget: 50,
    phone: '',
  });
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to access custom towel requests.",
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const customRequest = {
      id: `custom-${Date.now()}`,
      userId: user?.id || 'guest',
      userEmail: user?.email || 'guest@example.com',
      userName: user?.name || 'Guest User',
      title: formData.title,
      description: formData.description,
      quantity: Number(formData.quantity),
      budget: Number(formData.budget),
      phone: formData.phone,
      image: uploadedImage,
      status: 'pending',
      date: new Date().toISOString(),
    };
    
    const existingRequests = JSON.parse(localStorage.getItem('customRequests') || '[]');
    const updatedRequests = [...existingRequests, customRequest];
    localStorage.setItem('customRequests', JSON.stringify(updatedRequests));
    
    toast({
      title: "Custom request submitted!",
      description: "We'll review your request and get back to you soon.",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
            <p className="text-towel-gray mb-6">
              Please login to access custom towel requests.
            </p>
            <Button onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.div 
        className="flex-grow container mx-auto pt-32 pb-12 px-4" // Changed from py-12 to pt-32 to fix header overlap
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-4">Custom Towel Request</h1>
            <p className="text-towel-gray">
              Need a special towel or a bulk order? Tell us what you're looking for, and we'll create a custom solution for you.
            </p>
          </div>
          
          <div className="glass-panel p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Custom Request Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Request Title</Label>
                <Input 
                  id="title"
                  name="title"
                  placeholder="e.g., Customized Beach Towels for Corporate Event"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-towel-gray mt-1">A brief title for your custom request</p>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Please describe your request in detail - include size, color, material preferences, custom embroidery needs, etc."
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-towel-gray mt-1">The more detail you provide, the better we can meet your needs</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="quantity">Quantity Needed</Label>
                  <Input 
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="budget">Estimated Budget (INR)</Label>
                  <Input 
                    id="budget"
                    name="budget"
                    type="number"
                    min="1"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-sm text-towel-gray mt-1">Your approximate budget per item</p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  placeholder="For faster communication"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <p className="text-sm text-towel-gray mt-1">We'll use this to discuss your request if needed</p>
              </div>
              
              <div>
                <Label>Design Reference (Optional)</Label>
                <div className="mt-2">
                  {uploadedImage ? (
                    <div className="relative w-full rounded-lg overflow-hidden border border-input">
                      <img 
                        src={uploadedImage} 
                        alt="Design reference" 
                        className="w-full h-64 object-contain bg-muted p-2"
                      />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X size={18} />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-input rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mx-auto h-12 w-12 text-towel-gray mb-3" />
                      <p className="text-sm font-medium">Click to upload an image</p>
                      <p className="text-xs text-towel-gray mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default CustomRequest;
