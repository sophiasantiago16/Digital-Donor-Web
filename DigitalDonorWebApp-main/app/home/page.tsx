'use client';

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image, ScrollView } from 'react-native';
import { useRouter } from 'next/navigation';

// ==========================================
// CLEAN SVG ICONS
// ==========================================
const SearchIcon = ({ color = '#888', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = ({ color = '#FFF', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const MenuIcon = ({ color = '#333', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const UserIcon = ({ color = '#333', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ReceiptIcon = ({ color = '#333', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const SettingsIcon = ({ color = '#333', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const CloseIcon = ({ color = '#A0A0A0', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CreditCardIcon = ({ color = '#FFF', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const CheckIcon = ({ color = '#FFF', size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CopyIcon = ({ color = '#888', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const ChevronIcon = ({ color = '#888', size = 16, direction = 'down' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: direction === 'up' ? 'rotate(180deg)' : 'none' }}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// ==========================================
// MOCK DATA
// ==========================================
const DONATION_CARDS = [
  { id: '1', title: 'Support Families in Need', desc: 'Help provide essential supplies and support to families facing hardship in our community.', amount: '500 php', img: '/img_6.png' },
  { id: '2', title: 'Feed the Hungry', desc: 'Provide nutritious meals to those experiencing food insecurity in local communities.', amount: '1000 php', img: '/img_7.png' },
  { id: '3', title: 'Education for all', desc: 'Support educational programs and provide learning materials for underprivileged children.', amount: '750 php', img: '/img_8.png' },
  { id: '4', title: 'Medical Assistance Fund', desc: 'Help provide medical care and treatment for those who cannot afford healthcare services.', amount: '2,400 php', img: '/img_9.png' },
  { id: '5', title: 'Disaster Relief Support', desc: 'Provide emergency assistance to communities affected by natural disasters and crises.', amount: '1,500 php', img: '/img_10.png' },
  { id: '6', title: 'Environmental Conservation', desc: 'Support efforts to protect and preserve our natural environment for future generations.', amount: '800 php', img: '/img_11.png' },
];

const PAYMENT_METHODS = ['Gcash', 'Paymaya', 'Credit Card'];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function HomeScreen() {
  const router = useRouter();
  
  // Page Transition States
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false); 
    setIsExiting(true);   
    setTimeout(() => {
      router.push(path);
    }, 300);
  };
  
  // Cart States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Navigation Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Payment Modal States
  // Removed 'details' from the flow entirely
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'selection' | 'success'>('selection');
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);

  // Helper Functions
  const addToCart = (card: any) => setCartItems([...cartItems, card]);
  const removeFromCart = (indexToRemove: number) => setCartItems(cartItems.filter((_, index) => index !== indexToRemove));

  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => {
      const numericAmount = parseInt(item.amount.replace(/,/g, '').replace(' php', ''), 10);
      return sum + numericAmount;
    }, 0);
    return total.toLocaleString() + ' php';
  };

  const changePaymentStep = (newStep: 'selection' | 'success') => {
    setIsStepTransitioning(true); 
    setTimeout(() => {
      setPaymentStep(newStep);    
      setIsStepTransitioning(false); 
    }, 250); 
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setIsDropdownOpen(false);
    setTimeout(() => setPaymentStep('selection'), 300); 
  };

  // Filter cards based on search query
  const filteredCards = DONATION_CARDS.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    card.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[
      styles.masterContainer, 
      { 
        opacity: isMounted && !isExiting ? 1 : 0,
        transform: [{ translateY: isMounted && !isExiting ? 0 : 15 }], 
      }
    ]}>
      
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        {/* ========================================= */}
        {/* HEADER SECTION                            */}
        {/* ========================================= */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: '/logo_h.png' }} style={styles.logoImage} resizeMode="contain" />
            <Text style={styles.logoText}>Hopecard</Text>
          </View>
          
          <View style={styles.headerRight}>
            
            {isMenuOpen && (
              <Pressable style={styles.invisibleBackdrop} onPress={() => setIsMenuOpen(false)} />
            )}

            {/* Nav Menu Dropdown */}
            <View style={styles.menuContainer}>
              <Pressable style={styles.menuButton} onPress={() => setIsMenuOpen(!isMenuOpen)}>
                <View style={{ marginRight: 8 }}><MenuIcon color="#333" size={24} /></View>
                <Text style={styles.menuText}>Menu</Text>
              </Pressable>

              {isMenuOpen && (
                <View style={styles.navDropdown}>
                  <Pressable 
                    style={({ pressed }: { pressed: boolean }) => [styles.navDropdownItem, pressed && { backgroundColor: '#F5F5F5' }]}
                    onPress={() => handleNavigate('/profile')}
                  >
                    <View style={styles.navDropdownIconWrapper}><UserIcon color="#333" size={18} /></View>
                    <Text style={styles.navDropdownText}>Donor Profile</Text>
                  </Pressable>
                  
                  <Pressable 
                    style={({ pressed }: { pressed: boolean }) => [styles.navDropdownItem, pressed && { backgroundColor: '#F5F5F5' }]}
                    onPress={() => handleNavigate('/transactions')}
                  >
                    <View style={styles.navDropdownIconWrapper}><ReceiptIcon color="#333" size={18} /></View>
                    <Text style={styles.navDropdownText}>Transactions</Text>
                  </Pressable>
                  
                  <Pressable 
                    style={({ pressed }: { pressed: boolean }) => [styles.navDropdownItem, pressed && { backgroundColor: '#F5F5F5' }]}
                    onPress={() => { setIsMenuOpen(false); console.log('Going to Settings'); }}
                  >
                    <View style={styles.navDropdownIconWrapper}><SettingsIcon color="#333" size={18} /></View>
                    <Text style={styles.navDropdownText}>Settings</Text>
                  </Pressable>
                </View>
              )}
            </View>

            <Pressable style={styles.cartButton} onPress={() => setIsCartOpen(true)}>
              <View style={{ marginRight: 8 }}><CartIcon color="#FFF" size={18} /></View>
              <Text style={styles.cartText}>Cart {cartItems.length > 0 ? `(${cartItems.length})` : ''}</Text>
            </Pressable>
          </View>
        </View>

        {/* ========================================= */}
        {/* MAIN CONTENT (Donation Grid)              */}
        {/* ========================================= */}
        <View style={styles.mainContent}>
          <Text style={styles.pageTitle}>Browse Donation Cards</Text>
          <Text style={styles.pageSubtitle}>Support meaningful causes and make an impact in different communities</Text>

          {/* ACTIVE SEARCH BAR */}
          <View style={styles.searchContainer}>
            <View style={{ marginRight: 15 }}><SearchIcon color="#888" size={20} /></View>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search for donation cards" 
              placeholderTextColor="#A0A0A0" 
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              onChange={(e: any) => {
                if (e.target && typeof e.target.value === 'string') {
                  setSearchQuery(e.target.value);
                }
              }}
            />
          </View>

          <Text style={styles.resultsText}>
            <Text style={{fontWeight: 'bold'}}>{filteredCards.length}</Text> Cards found
          </Text>

          <View style={styles.gridContainer}>
            {filteredCards.map((card) => (
              <View key={card.id} style={styles.card}>
                <Image source={{ uri: card.img }} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDesc}>{card.desc}</Text>
                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.amountLabel}>Amount</Text>
                      <Text style={styles.amountValue}>{card.amount}</Text>
                    </View>
                    <Pressable style={styles.addButton} onPress={() => addToCart(card)}>
                      <View style={{ marginRight: 6 }}><CartIcon color="#FFF" size={14} /></View>
                      <Text style={styles.addText}>Add</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
            
            {/* Show message if no cards match the search */}
            {filteredCards.length === 0 && (
              <View style={{ width: '100%', padding: 40, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: '#888' }}>No donation cards match "{searchQuery}"</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* ========================================= */}
      {/* CART SIDEBAR OVERLAY                      */}
      {/* ========================================= */}
      <View pointerEvents={isCartOpen ? 'auto' : 'none'} style={styles.overlayContainer}>
        <Pressable style={[styles.backdrop, { opacity: isCartOpen ? 1 : 0 }]} onPress={() => setIsCartOpen(false)} />
        
        <View style={[styles.sidebar, { transform: [{ translateX: isCartOpen ? 0 : 450 }] }]}>
          <View style={styles.sidebarHeader}>
            <View style={styles.cartIconCircle}>
              <CartIcon color="#6A1B1B" size={22} />
            </View>
            <View>
              <Text style={styles.sidebarTitle}>Your Cart</Text>
              <Text style={styles.sidebarSubtitle}>{cartItems.length} item{cartItems.length !== 1 && 's'}</Text>
            </View>
          </View>

          <ScrollView style={styles.cartItemsList}>
            {cartItems.length === 0 ? (
              <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            ) : (
              cartItems.map((item, index) => (
                <View key={index} style={styles.cartItemCard}>
                  <Image source={{ uri: item.img }} style={styles.cartItemImage} resizeMode="cover" />
                  <View style={styles.cartItemInfo}>
                    <View style={styles.cartItemTitleRow}>
                      <Text style={styles.cartItemTitle} numberOfLines={2}>{item.title}</Text>
                      <Pressable onPress={() => removeFromCart(index)} style={({ pressed }: { pressed: boolean }) => [styles.removeButton, pressed && { opacity: 0.5 }]}>
                        <CloseIcon color="#A0A0A0" size={16} />
                      </Pressable>
                    </View>
                    <View style={styles.cartItemPriceRow}>
                      <Text style={styles.cartItemAmountLabel}>Amount</Text>
                      <Text style={styles.cartItemAmountValue}>{item.amount}</Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.checkoutSection}>
            <View style={styles.totalsCard}>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Subtotal</Text>
                <Text style={styles.totalsValue}>{calculateTotal()}</Text>
              </View>
              <View style={styles.line} />
              <View style={styles.totalsRow}>
                <Text style={styles.totalBoldLabel}>Total</Text>
                <Text style={styles.totalBoldValue}>{calculateTotal()}</Text>
              </View>
            </View>

            <Pressable 
              style={({ pressed }: { pressed: boolean }) => [styles.checkoutButton, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
              onPress={() => {
                if (cartItems.length > 0) {
                  setIsCartOpen(false);
                  setTimeout(() => setIsPaymentModalOpen(true), 300); 
                }
              }}
            >
              <View style={styles.buttonInnerContent}>
                <View style={{ marginRight: 10 }}><CreditCardIcon color="#FFF" size={20} /></View>
                <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ========================================= */}
      {/* DYNAMIC PAYMENT DETAILS MODAL             */}
      {/* ========================================= */}
      <View pointerEvents={isPaymentModalOpen ? 'auto' : 'none'} style={[styles.overlayContainer, { justifyContent: 'flex-end', zIndex: 1001 }]}>
        <Pressable style={[styles.backdrop, { opacity: isPaymentModalOpen ? 1 : 0 }]} onPress={closePaymentModal} />
        
        <View style={[styles.paymentModal, { 
          transform: [{ translateX: isPaymentModalOpen ? 0 : 450 }] 
        }]}>
          
          <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            {/* STEP 1: PAYMENT SELECTION */}
            {paymentStep === 'selection' && (
              <View style={[styles.modalStepContainer, { opacity: isStepTransitioning ? 0 : 1, transform: [{ scale: isStepTransitioning ? 0.95 : 1 }] }]}>
                <Text style={styles.paymentModalTitle}>Payment Details</Text>

                <View style={styles.amountBox}>
                  <Text style={styles.aboutToPayText}>About to pay:</Text>
                  <Text style={styles.amountBoxValue}>{calculateTotal()}</Text>
                </View>

                <Text style={styles.paymentMethodLabel}>Payment Method</Text>
                <View style={styles.dropdownContainer}>
                  <Pressable style={styles.dropdownButton} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <Text style={[styles.dropdownButtonText, paymentMethod && { color: '#333' }]}>
                      {paymentMethod || 'Choose Payment Method'}
                    </Text>
                    <ChevronIcon color="#888" size={16} direction={isDropdownOpen ? 'up' : 'down'} />
                  </Pressable>

                  <View pointerEvents={isDropdownOpen ? 'auto' : 'none'} style={[styles.dropdownList, { opacity: isDropdownOpen ? 1 : 0, transform: [{ translateY: isDropdownOpen ? 0 : -10 }] }]}>
                    {PAYMENT_METHODS.map((method, index) => (
                      <Pressable 
                        key={method} 
                        style={[styles.dropdownItem, index === PAYMENT_METHODS.length - 1 && { borderBottomWidth: 0 }]}
                        onPress={() => { setPaymentMethod(method); setIsDropdownOpen(false); }}
                      >
                        <Text style={styles.dropdownItemText}>{method}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <Pressable 
                  style={({ pressed }: { pressed: boolean }) => [
                    styles.continueButton, 
                    !paymentMethod && { opacity: 0.5 }, 
                    pressed && paymentMethod && { opacity: 0.85, transform: [{ scale: 0.98 }] }
                  ]}
                  onPress={() => {
                    if (paymentMethod) {
                      // Skips right over the form and goes straight to success!
                      changePaymentStep('success');
                      setCartItems([]); // Clears the cart when payment succeeds
                    }
                  }}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </Pressable>
              </View>
            )}

            {/* STEP 2: SUCCESS SCREEN */}
            {paymentStep === 'success' && (
              <View style={[styles.modalStepContainer, { opacity: isStepTransitioning ? 0 : 1, transform: [{ scale: isStepTransitioning ? 0.95 : 1 }] }]}>
                <Text style={styles.paymentModalTitle}>Donation Confirmation</Text>
                
                <View style={styles.successIconContainer}>
                  <View style={[styles.greenCheckCircle, { transform: [{ scale: isStepTransitioning ? 0.5 : 1 }] }]}>
                    <CheckIcon color="#FFFFFF" size={44} />
                  </View>
                </View>
                
                <Text style={[styles.successTitle, { marginBottom: 10 }]}>Thank You!</Text>
                <Text style={[styles.successMessage, { fontSize: 14, color: '#666', fontWeight: 'normal', marginBottom: 30 }]}>
                  We have received your payment. An email confirmation has been sent.
                </Text>

                <Text style={styles.shareLabel}>Your Sharable Donation Link:</Text>
                <View style={styles.shareBoxContainer}>
                  <TextInput 
                    style={styles.shareInput} 
                    value="api.digitaldonor.example.com/donations/DON-987654" 
                    editable={false} 
                  />
                  <Pressable onPress={() => alert('Link Copied!')}>
                    <CopyIcon color="#8A1515" size={18} />
                  </Pressable>
                </View>

                <Pressable 
                  style={({ pressed }: { pressed: boolean }) => [
                    styles.continueButton, 
                    { marginTop: 30, backgroundColor: '#F3F4F6', backgroundImage: 'none', borderWidth: 1, borderColor: '#E5E7EB', boxShadow: 'none' },
                    pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }
                  ]}
                  onPress={closePaymentModal}
                >
                  <Text style={[styles.continueButtonText, { color: '#333' }]}>BACK TO HOMEPAGE</Text>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: { 
    flex: 1, position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', 
  } as any,
  
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 40, paddingVertical: 15, backgroundImage: 'linear-gradient(to right, #FFC0C0 0%, #8A1515 50%, #FFC0C0 100%)', zIndex: 1100 } as any,
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 55, height: 55, marginRight: 15 },
  logoText: { fontSize: 30, fontWeight: 'bold', color: '#333' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  
  menuContainer: { position: 'relative', zIndex: 1200 },
  menuButton: { flexDirection: 'row', alignItems: 'center', marginRight: 25, cursor: 'pointer' } as any,
  menuText: { fontSize: 16, fontWeight: '500', color: '#333' },
  
  navDropdown: { position: 'absolute', top: 40, left: -40, width: 220, backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 10, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)' } as any,
  navDropdownItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 25, cursor: 'pointer' } as any,
  navDropdownIconWrapper: { width: 24, alignItems: 'center', marginRight: 10 },
  navDropdownText: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  invisibleBackdrop: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050, cursor: 'default' } as any,

  cartButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#5A1010', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, cursor: 'pointer', zIndex: 1100 } as any,
  cartText: { fontSize: 14, fontWeight: 'bold', color: '#FFF' },

  mainContent: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 40, marginTop: 40, marginBottom: 40, maxWidth: 1400, alignSelf: 'center', width: '92%', boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.05)', zIndex: 10 } as any,
  pageTitle: { fontSize: 32, fontWeight: 'bold', color: '#6A1B1B', marginBottom: 10 },
  pageSubtitle: { fontSize: 18, color: '#888', marginBottom: 30 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 15, paddingHorizontal: 20, height: 60, marginBottom: 30, borderWidth: 1, borderColor: '#EFEFEF' },
  
  searchInput: { flex: 1, fontSize: 16, color: '#333', outlineStyle: 'none' } as any,
  
  resultsText: { fontSize: 16, color: '#666', marginBottom: 20 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 30 } as any,
  card: { width: '31%', minWidth: 300, backgroundColor: '#FFFFFF', borderRadius: 20, overflow: 'hidden', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.08)', marginBottom: 10, borderWidth: 1, borderColor: '#F0F0F0' } as any,
  cardImage: { width: '100%', height: 200 },
  cardBody: { padding: 25 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  cardDesc: { fontSize: 14, color: '#777', lineHeight: 22, height: 70 }, 
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 },
  amountLabel: { fontSize: 12, color: '#888', marginBottom: 3 },
  amountValue: { fontSize: 16, fontWeight: 'bold', color: '#6A1B1B' },
  addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#6A1B1B', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, cursor: 'pointer' } as any,
  addText: { fontSize: 14, fontWeight: 'bold', color: '#FFF' },

  overlayContainer: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', zIndex: 1200 } as any,
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(6px)', transition: 'opacity 0.3s ease-in-out' } as any,
  sidebar: { position: 'absolute', right: 0, width: 450, backgroundColor: '#FFFFFF', height: '100%', boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)' } as any,
  sidebarHeader: { flexDirection: 'row', alignItems: 'center', padding: 30, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  cartIconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFE6E6', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  sidebarTitle: { fontSize: 20, fontWeight: 'bold', color: '#6A1B1B', marginBottom: 2 },
  sidebarSubtitle: { fontSize: 14, color: '#888' },
  
  cartItemsList: { flexShrink: 1, flexGrow: 0, padding: 30 },
  
  emptyCartText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 40 },
  cartItemCard: { flexDirection: 'row', backgroundColor: '#F9F9F9', borderRadius: 15, padding: 15, marginBottom: 15, boxShadow: '0px 2px 10px rgba(0,0,0,0.05)' } as any,
  cartItemImage: { width: 80, height: 60, borderRadius: 10, marginRight: 15 },
  cartItemInfo: { flex: 1, justifyContent: 'center' },
  cartItemTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  cartItemTitle: { flex: 1, fontSize: 14, fontWeight: 'bold', color: '#333', marginRight: 10 },
  removeButton: { padding: 4, cursor: 'pointer', marginTop: -4, marginRight: -4 } as any,
  cartItemPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cartItemAmountLabel: { fontSize: 12, color: '#888' },
  cartItemAmountValue: { fontSize: 12, fontWeight: 'bold', color: '#6A1B1B' },
  
  checkoutSection: { backgroundColor: '#F3F4F6', padding: 30, paddingBottom: 40, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  
  totalsCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 25, marginBottom: 25, boxShadow: '0px 10px 25px rgba(0,0,0,0.06)' } as any,
  totalsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  line: { height: 1, backgroundColor: '#EAEAEA', marginVertical: 15 }, 
  totalsLabel: { fontSize: 13, fontWeight: '600', color: '#A0A0A0' }, 
  totalsValue: { fontSize: 14, fontWeight: 'bold', color: '#333' }, 
  totalBoldLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' }, 
  totalBoldValue: { fontSize: 16, fontWeight: 'bold', color: '#8A1515' }, 
  
  checkoutButton: { height: 55, width: '100%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundImage: 'linear-gradient(to right, #D9898C, #B75658)', boxShadow: '0px 8px 20px rgba(183, 86, 88, 0.3)', cursor: 'pointer', transition: 'all 0.2s ease' } as any,
  buttonInnerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  checkoutButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

  paymentModal: { 
    position: 'absolute', 
    right: 0, 
    height: '100%', 
    width: 450, 
    backgroundColor: '#FFFFFF', 
    padding: 40, 
    paddingTop: 60,
    boxShadow: '-10px 0px 40px rgba(0, 0, 0, 0.1)', 
    zIndex: 1201, 
    transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)' 
  } as any,
  modalStepContainer: { transition: 'all 0.25s ease-in-out' } as any,
  paymentModalTitle: { fontSize: 26, fontWeight: 'bold', color: '#6A1B1B', textAlign: 'center', marginBottom: 30, marginTop: 10 },
  amountBox: { backgroundColor: '#FFF4F4', borderRadius: 15, padding: 25, alignItems: 'center', marginBottom: 35, borderWidth: 1, borderColor: '#E6CACA', boxShadow: 'inset 0px 4px 10px rgba(0,0,0,0.02)' } as any,
  aboutToPayText: { fontSize: 14, fontWeight: 'bold', color: '#6A1B1B', alignSelf: 'flex-start', marginBottom: 15 },
  amountBoxValue: { fontSize: 36, fontWeight: 'bold', color: '#6A1B1B' },
  paymentMethodLabel: { fontSize: 14, fontWeight: 'bold', color: '#6A1B1B', marginBottom: 10 },
  dropdownContainer: { position: 'relative', marginBottom: 40, zIndex: 10 },
  dropdownButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 12, padding: 18, cursor: 'pointer', boxShadow: '0px 2px 5px rgba(0,0,0,0.02)' } as any,
  dropdownButtonText: { fontSize: 15, color: '#A0A0A0', fontWeight: '500' },
  dropdownList: { position: 'absolute', top: 60, left: 0, right: 0, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#D9D9D9', boxShadow: '0px 5px 15px rgba(0,0,0,0.1)', overflow: 'hidden', transition: 'all 0.2s ease-in-out' } as any,
  dropdownItem: { padding: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', cursor: 'pointer' } as any,
  dropdownItemText: { fontSize: 15, color: '#333', fontWeight: '500' },
  continueButton: { height: 55, width: '100%', borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundImage: 'linear-gradient(to right, #D9898C, #B75658)', boxShadow: '0px 8px 20px rgba(183, 86, 88, 0.3)', cursor: 'pointer', transition: 'all 0.2s ease' } as any,
  continueButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  successTitle: { fontSize: 26, fontWeight: 'bold', color: '#8A1515', textAlign: 'center', marginBottom: 25 },
  successIconContainer: { alignItems: 'center', marginBottom: 25 },
  greenCheckCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#28A745', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 8px 20px rgba(40, 167, 69, 0.3)', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' } as any,
  successMessage: { fontSize: 14, fontWeight: 'normal', color: '#666', textAlign: 'center', marginBottom: 30 },
  shareLabel: { fontSize: 14, fontWeight: 'bold', color: '#8A1515', marginBottom: 12, marginLeft: 2 },
  shareBoxContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 15, height: 50 },
  shareInput: { flex: 1, fontSize: 13, color: '#666', outlineStyle: 'none' } as any,
});