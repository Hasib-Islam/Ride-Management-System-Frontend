import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useLogoutMutation } from '@/store/api/authApi';
import { logout } from '@/store/slices/authSlice';
import { toast } from 'sonner';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Settings, Menu, X } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import Logo from './Logo';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isInitialized } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutApi] = useLogoutMutation();

  useEffect(() => {
    console.log('Navbar auth state:', {
      user,
      isAuthenticated,
      isInitialized,
      hasRole: !!user?.role,
      role: user?.role,
    });
  }, [user, isAuthenticated, isInitialized]);

  const handleLogout = async () => {
    try {
      await logoutApi({}).unwrap();
      dispatch(logout());
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.data?.message || 'Logout failed');
    }
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  if (!isInitialized) {
    return (
      <nav className="bg-background border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Logo />
              </div>
              <span className="font-bold text-xl text-foreground">
                Ride App
              </span>
            </div>
            <div className="animate-pulse bg-muted h-8 w-8 rounded-full"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Logo />
            </div>
            <span className="font-bold text-xl text-foreground">Ride App</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-foreground bg-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}

              {isAuthenticated && user?.role && (
                <NavigationMenuItem>
                  <Link
                    to={`/dashboard/${user.role}`}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname.startsWith('/dashboard')
                        ? 'text-foreground bg-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Dashboard
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground capitalize">
                        {user.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}

            <Popover open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-40 p-2">
                <div className="flex flex-col space-y-1">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="justify-start"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to={item.href}>{item.name}</Link>
                    </Button>
                  ))}

                  {isAuthenticated && user?.role && (
                    <Button
                      variant="ghost"
                      className="justify-start"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to={`/dashboard/${user.role}`}>Dashboard</Link>
                    </Button>
                  )}

                  {!isAuthenticated && (
                    <>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to="/login">Sign in</Link>
                      </Button>
                      <Button
                        variant="default"
                        className="justify-start"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to="/register">Sign up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
}
