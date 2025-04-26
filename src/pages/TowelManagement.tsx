
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { Image, X, Trash, Upload, Plus } from 'lucide-react';

interface TowelProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const TowelManagement = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<TowelProduct[]>([]);
  const [newTowel, setNewTowel] = useState({
    name: '',
    price: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not an admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('towelProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // If no products in localStorage, use the mock data
      const mockProducts = [
        {
          id: '1',
          name: 'Ultra Soft Bath Towel',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
          category: 'Bath',
          isNew: true
        },
        {
          id: '2',
          name: 'Premium Hand Towel Set',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1583845112203-29329902332e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
          category: 'Hand',
          isBestseller: true
        },
        // ... more mock products from ProductGrid component
      ];
      setProducts(mockProducts);
      localStorage.setItem('towelProducts', JSON.stringify(mockProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('towelProducts', JSON.stringify(products));
    }
  }, [products]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTowel({
      ...newTowel,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type', {
          description: 'Please upload a JPG, JPEG, or PNG image.',
        });
        return;
      }
      
      setImageFile(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageSelection = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateTowelInput = () => {
    if (!newTowel.name.trim()) return 'Towel name is required';
    if (!newTowel.price.trim()) return 'Price is required';
    if (isNaN(parseFloat(newTowel.price)) || parseFloat(newTowel.price) <= 0) return 'Price must be a positive number';
    if (!imageFile) return 'Image is required';
    if (!newTowel.category.trim()) return 'Category is required';
    return null;
  };

  const handleAddTowel = () => {
    const validationError = validateTowelInput();
    if (validationError) {
      toast.error('Validation Error', {
        description: validationError,
      });
      return;
    }

    // Use the image preview data URL as the image source
    const newProduct: TowelProduct = {
      id: Date.now().toString(),
      name: newTowel.name,
      price: parseFloat(newTowel.price),
      image: imagePreview as string, // This is the base64 data URL from the file upload
      category: newTowel.category,
      isNew: true,
    };

    setProducts([...products, newProduct]);
    setNewTowel({
      name: '',
      price: '',
      category: '',
    });
    clearImageSelection();
    
    toast.success('Success', {
      description: 'New towel added to collection!',
    });
  };

  const handleDeleteTowel = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('towelProducts', JSON.stringify(updatedProducts));
    
    toast.success('Success', {
      description: 'Towel removed from collection',
    });
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <motion.div 
      className="container mx-auto py-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel p-8 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Towel Management</h1>
        
        <div className="mb-8">
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => navigate('/admin-dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Add New Towel Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Towel</CardTitle>
              <CardDescription>Create a new towel to add to your collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Towel Name</label>
                <Input 
                  name="name" 
                  value={newTowel.name}
                  onChange={handleInputChange}
                  placeholder="Ultra Soft Bath Towel"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Input 
                  name="category" 
                  value={newTowel.category}
                  onChange={handleInputChange}
                  placeholder="Bath, Hand, Face, etc."
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Price (₹)</label>
                <Input 
                  name="price" 
                  type="number"
                  min="0"
                  step="0.01"
                  value={newTowel.price}
                  onChange={handleInputChange}
                  placeholder="29.99"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Upload Image</label>
                <div className="mt-2">
                  {imagePreview ? (
                    <div className="relative mt-2 border rounded-md overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-40 object-contain bg-muted p-2"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                        onClick={clearImageSelection}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-input rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mx-auto h-12 w-12 text-towel-gray mb-3" />
                      <p className="text-sm font-medium">Click to upload an image</p>
                      <p className="text-xs text-towel-gray mt-1">JPG, JPEG, or PNG</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAddTowel}
                className="w-full"
              >
                <Plus size={16} className="mr-1" />
                Add Towel
              </Button>
            </CardFooter>
          </Card>
          
          {/* Current Towels Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Current Collection</CardTitle>
              <CardDescription>Manage your existing towel collection</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              {products.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="relative h-12 w-12 overflow-hidden rounded-md">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                          {product.isNew && (
                            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                              New
                            </span>
                          )}
                          {product.isBestseller && (
                            <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                              Bestseller
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₹{product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteTowel(product.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No towels in collection yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default TowelManagement;
