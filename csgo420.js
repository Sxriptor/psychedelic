/**
 * CS:GO Style QA Cheat System
 * ===========================
 * Internal debugging toolkit for FPS game testing
 * Style: Classic CS cheat menu interface
 * For QA/Dev use only - NOT for production builds
 */

class CSGOStyleCheats {
    constructor() {
        this.features = {
            // Aim features
            aimbot: { enabled: false, fov: 90, smooth: 5.0, rcs: true },
            triggerbot: { enabled: false, delay: 50 },
            
            // Visual features  
            wallhack: { enabled: false, enemies: true, teammates: false, weapons: true },
            esp: { 
                enabled: false, 
                boxes: true, 
                names: true, 
                health: true, 
                distance: true,
                skeleton: false,
                tracers: false
            },
            radar: { enabled: false, range: 500 },
            noFlash: { enabled: false },
            noSmoke: { enabled: false },
            
            // Movement/Misc
            bhop: { enabled: false, perfectHops: false },
            speedHack: { enabled: false, multiplier: 1.5 },
            noClip: { enabled: false },
            godMode: { enabled: false },
            
            // Other
            skinChanger: { enabled: false },
            rankRevealer: { enabled: false }
        };
        
        this.menuVisible = false;
        this.selectedCategory = 0;
        this.selectedItem = 0;
        
        this.categories = [
            'Aimbot', 'Visuals', 'Movement', 'Misc', 'Config'
        ];
        
        // Initialize CS2 integration
        this.cs2 = null;
        this.initCS2Integration();
        
        this.init();
    }
    
    async initCS2Integration() {
        try {
            // Load CS2 integration module
            if (typeof CS2Integration !== 'undefined') {
                this.cs2 = new CS2Integration();
                console.log('[420Cheats] CS2 integration initialized');
            } else {
                console.warn('[420Cheats] CS2Integration not found - running in demo mode');
            }
        } catch (error) {
            console.error('[420Cheats] Failed to initialize CS2 integration:', error);
        }
    }
    
    init() {
        this.createMenuHTML();
        this.bindEventListeners();
        this.startUpdateLoop();
        console.log('[420Cheats] QA Debug System initialized');
    }
    
    createMenuHTML() {
        // Create main menu container
        const menuHTML = `
            <div id="cheat-menu" class="cheat-menu" style="display: none;">
                <div class="menu-header">
                    <div class="logo">420Cheats QA</div>
                    <div class="version">v2.1 [QA BUILD]</div>
                </div>
                
                <div class="menu-content">
                    <div class="categories">
                        ${this.categories.map((cat, i) => 
                            `<div class="category ${i === 0 ? 'active' : ''}" data-category="${i}">${cat}</div>`
                        ).join('')}
                    </div>
                    
                    <div class="features">
                        <div id="aimbot-features" class="feature-group active">
                            <div class="feature-item">
                                <label><input type="checkbox" id="aimbot-enable"> Aimbot</label>
                                <div class="sub-options">
                                    <div class="slider-container">
                                        <label>FOV: <span id="aimbot-fov-val">90</span></label>
                                        <input type="range" id="aimbot-fov" min="1" max="180" value="90">
                                    </div>
                                    <div class="slider-container">
                                        <label>Smooth: <span id="aimbot-smooth-val">5.0</span></label>
                                        <input type="range" id="aimbot-smooth" min="0.1" max="10" step="0.1" value="5.0">
                                    </div>
                                    <label><input type="checkbox" id="aimbot-rcs" checked> RCS (Recoil Control)</label>
                                </div>
                            </div>
                            
                            <div class="feature-item">
                                <label><input type="checkbox" id="triggerbot-enable"> Triggerbot</label>
                                <div class="sub-options">
                                    <div class="slider-container">
                                        <label>Delay: <span id="trigger-delay-val">50</span>ms</label>
                                        <input type="range" id="trigger-delay" min="0" max="500" value="50">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="visuals-features" class="feature-group">
                            <div class="feature-item">
                                <label><input type="checkbox" id="wallhack-enable"> Wallhack</label>
                                <div class="sub-options">
                                    <label><input type="checkbox" id="wh-enemies" checked> Enemies</label>
                                    <label><input type="checkbox" id="wh-teammates"> Teammates</label>
                                    <label><input type="checkbox" id="wh-weapons" checked> Weapons</label>
                                </div>
                            </div>
                            
                            <div class="feature-item">
                                <label><input type="checkbox" id="esp-enable"> ESP</label>
                                <div class="sub-options">
                                    <label><input type="checkbox" id="esp-boxes" checked> Boxes</label>
                                    <label><input type="checkbox" id="esp-names" checked> Names</label>
                                    <label><input type="checkbox" id="esp-health" checked> Health</label>
                                    <label><input type="checkbox" id="esp-distance" checked> Distance</label>
                                    <label><input type="checkbox" id="esp-skeleton"> Skeleton</label>
                                    <label><input type="checkbox" id="esp-tracers"> Tracers</label>
                                </div>
                            </div>
                            
                            <div class="feature-item">
                                <label><input type="checkbox" id="radar-enable"> Radar Hack</label>
                            </div>
                            
                            <div class="feature-item">
                                <label><input type="checkbox" id="noflash-enable"> No Flash</label>
                            </div>
                            
                            <div class="feature-item">
                                <label><input type="checkbox" id="nosmoke-enable"> No Smoke</label>
                            </div>
                        </div>
                        
                        <div id="movement-features" class="feature-group">
                            <div class="feature-item">
                                <label><input type="checkbox" id="bhop-enable"> Bunny Hop</label>
                                <div class="sub-options">
                                    <label><input type="checkbox" id="bhop-perfect"> Perfect Hops</label>
                                </div>
                            </div>
                            
                            <div class="feature-item">
                                <label><input type="checkbox" id="speed-enable"> Speed Hack</label>
                                <div class="sub-options">
                                    <div class="slider-container">
                                        <label>Multiplier: <span id="speed-mult-val">1.5</span>x</label>
                                        <input type="range" id="speed-mult" min="0.5" max="5" step="0.1" value="1.5">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="feature-item">
                                <label><input type="checkbox" id="noclip-enable"> No Clip</label>
                            </div>
                        </div>
                        
                        <div id="misc-features" class="feature-group">
                            <div class="feature-item">
                                <label><input type="checkbox" id="god-enable"> God Mode</label>
                            </div>
                            
                            <div class="feature-item">
                                <label><input type="checkbox" id="skin-enable"> Skin Changer</label>
                            </div>
                            
                            <div class="feature-item">
                                <label><input type="checkbox" id="rank-enable"> Rank Revealer</label>
                            </div>
                        </div>
                        
                        <div id="config-features" class="feature-group">
                            <div class="config-buttons">
                                <button class="config-btn" id="save-config">Save Config</button>
                                <button class="config-btn" id="load-config">Load Config</button>
                                <button class="config-btn" id="reset-config">Reset All</button>
                            </div>
                            
                            <div class="keybind-section">
                                <h4>Keybinds</h4>
                                <div class="keybind-item">
                                    <span>Menu Toggle:</span>
                                    <span class="keybind">INSERT</span>
                                </div>
                                <div class="keybind-item">
                                    <span>Panic Key:</span>
                                    <span class="keybind">END</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="menu-footer">
                    <div class="status-indicator active">QA BUILD ACTIVE</div>
                </div>
            </div>
            
            <div id="debug-overlay" class="debug-overlay">
                <div class="debug-info">
                    <div id="active-features">Active Features: None</div>
                    <div id="target-info">Target: None</div>
                    <div id="performance">FPS: 60 | Cheat FPS: 60</div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        this.addCSS();
    }
    
    addCSS() {
        const css = `
            .cheat-menu {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 600px;
                height: 450px;
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                border: 2px solid #0f3460;
                border-radius: 8px;
                font-family: 'Consolas', monospace;
                color: #ffffff;
                z-index: 10000;
                box-shadow: 0 0 30px rgba(15, 52, 96, 0.8);
                user-select: none;
            }
            
            .menu-header {
                background: linear-gradient(90deg, #0f3460, #533a71);
                padding: 12px 20px;
                border-radius: 6px 6px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #533a71;
            }
            
            .logo {
                font-size: 18px;
                font-weight: bold;
                color: #64ffda;
                text-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
            }
            
            .version {
                font-size: 12px;
                color: #ff6b6b;
                background: rgba(255, 107, 107, 0.1);
                padding: 4px 8px;
                border-radius: 4px;
            }
            
            .menu-content {
                display: flex;
                height: 340px;
            }
            
            .categories {
                width: 120px;
                background: rgba(0, 0, 0, 0.3);
                border-right: 1px solid #533a71;
            }
            
            .category {
                padding: 15px 20px;
                cursor: pointer;
                border-bottom: 1px solid rgba(83, 58, 113, 0.3);
                transition: all 0.2s;
            }
            
            .category:hover {
                background: rgba(100, 255, 218, 0.1);
            }
            
            .category.active {
                background: linear-gradient(90deg, rgba(100, 255, 218, 0.2), transparent);
                border-right: 3px solid #64ffda;
                color: #64ffda;
            }
            
            .features {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
            }
            
            .feature-group {
                display: none;
            }
            
            .feature-group.active {
                display: block;
            }
            
            .feature-item {
                margin-bottom: 20px;
                padding: 15px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 6px;
                border-left: 3px solid transparent;
                transition: all 0.2s;
            }
            
            .feature-item:hover {
                background: rgba(0, 0, 0, 0.3);
                border-left-color: #64ffda;
            }
            
            .feature-item label {
                display: block;
                margin-bottom: 8px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .feature-item input[type="checkbox"] {
                margin-right: 10px;
                transform: scale(1.2);
                accent-color: #64ffda;
            }
            
            .sub-options {
                margin-left: 25px;
                margin-top: 10px;
                padding-left: 15px;
                border-left: 2px solid rgba(100, 255, 218, 0.3);
            }
            
            .sub-options label {
                font-weight: normal;
                font-size: 13px;
                margin-bottom: 6px;
                color: #cccccc;
            }
            
            .slider-container {
                margin: 10px 0;
            }
            
            .slider-container label {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
            }
            
            .slider-container input[type="range"] {
                width: 100%;
                height: 4px;
                background: #333;
                border-radius: 2px;
                outline: none;
                -webkit-appearance: none;
            }
            
            .slider-container input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                background: #64ffda;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 6px rgba(100, 255, 218, 0.6);
            }
            
            .config-buttons {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
            }
            
            .config-btn {
                flex: 1;
                padding: 10px;
                background: linear-gradient(135deg, #533a71, #0f3460);
                border: 1px solid #64ffda;
                border-radius: 4px;
                color: #ffffff;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .config-btn:hover {
                background: linear-gradient(135deg, #64ffda, #533a71);
                box-shadow: 0 0 10px rgba(100, 255, 218, 0.4);
            }
            
            .keybind-section h4 {
                color: #64ffda;
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(100, 255, 218, 0.3);
                padding-bottom: 5px;
            }
            
            .keybind-item {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .keybind {
                background: rgba(100, 255, 218, 0.2);
                padding: 2px 8px;
                border-radius: 3px;
                color: #64ffda;
                font-weight: bold;
            }
            
            .menu-footer {
                background: rgba(0, 0, 0, 0.4);
                padding: 8px 20px;
                border-radius: 0 0 6px 6px;
                border-top: 1px solid #533a71;
            }
            
            .status-indicator {
                font-size: 12px;
                color: #4ade80;
                font-weight: bold;
            }
            
            .status-indicator.active::before {
                content: "● ";
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            .debug-overlay {
                position: fixed;
                top: 20px;
                left: 20px;
                background: rgba(0, 0, 0, 0.8);
                padding: 15px;
                border-radius: 6px;
                font-family: 'Consolas', monospace;
                font-size: 12px;
                color: #64ffda;
                z-index: 9999;
                border: 1px solid rgba(100, 255, 218, 0.3);
            }
            
            .debug-info div {
                margin-bottom: 5px;
            }
            
            /* Scrollbar styling */
            .features::-webkit-scrollbar {
                width: 8px;
            }
            
            .features::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
            }
            
            .features::-webkit-scrollbar-thumb {
                background: #64ffda;
                border-radius: 4px;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    bindEventListeners() {
        // Menu toggle
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Insert') {
                this.toggleMenu();
            } else if (e.code === 'End') {
                this.panicKey();
            }
        });
        
        // Category switching
        document.querySelectorAll('.category').forEach((cat, index) => {
            cat.addEventListener('click', () => this.switchCategory(index));
        });
        
        // Feature toggles and sliders
        this.bindFeatureControls();
        
        // Config buttons
        document.getElementById('save-config').addEventListener('click', () => this.saveConfig());
        document.getElementById('load-config').addEventListener('click', () => this.loadConfig());
        document.getElementById('reset-config').addEventListener('click', () => this.resetConfig());
    }
    
    bindFeatureControls() {
        // Aimbot controls
        document.getElementById('aimbot-enable').addEventListener('change', (e) => {
            this.features.aimbot.enabled = e.target.checked;
            this.logFeatureToggle('Aimbot', e.target.checked);
        });
        
        document.getElementById('aimbot-fov').addEventListener('input', (e) => {
            this.features.aimbot.fov = parseInt(e.target.value);
            document.getElementById('aimbot-fov-val').textContent = e.target.value;
        });
        
        document.getElementById('aimbot-smooth').addEventListener('input', (e) => {
            this.features.aimbot.smooth = parseFloat(e.target.value);
            document.getElementById('aimbot-smooth-val').textContent = e.target.value;
        });
        
        // Triggerbot
        document.getElementById('triggerbot-enable').addEventListener('change', (e) => {
            this.features.triggerbot.enabled = e.target.checked;
            this.logFeatureToggle('Triggerbot', e.target.checked);
        });
        
        // ESP controls
        document.getElementById('esp-enable').addEventListener('change', (e) => {
            this.features.esp.enabled = e.target.checked;
            this.logFeatureToggle('ESP', e.target.checked);
        });
        
        // Wallhack
        document.getElementById('wallhack-enable').addEventListener('change', (e) => {
            this.features.wallhack.enabled = e.target.checked;
            this.logFeatureToggle('Wallhack', e.target.checked);
        });
        
        // Movement features
        document.getElementById('bhop-enable').addEventListener('change', (e) => {
            this.features.bhop.enabled = e.target.checked;
            this.logFeatureToggle('Bunny Hop', e.target.checked);
        });
        
        document.getElementById('speed-enable').addEventListener('change', (e) => {
            this.features.speedHack.enabled = e.target.checked;
            this.logFeatureToggle('Speed Hack', e.target.checked);
        });
        
        document.getElementById('noclip-enable').addEventListener('change', (e) => {
            this.features.noClip.enabled = e.target.checked;
            this.logFeatureToggle('No Clip', e.target.checked);
        });
        
        // God mode
        document.getElementById('god-enable').addEventListener('change', (e) => {
            this.features.godMode.enabled = e.target.checked;
            this.logFeatureToggle('God Mode', e.target.checked);
        });
        
        // Add more control bindings as needed...
    }
    
    toggleMenu() {
        const menu = document.getElementById('cheat-menu');
        this.menuVisible = !this.menuVisible;
        menu.style.display = this.menuVisible ? 'block' : 'none';
        
        if (this.menuVisible) {
            console.log('[420Cheats] Menu opened');
        }
    }
    
    switchCategory(index) {
        // Update category selection
        document.querySelectorAll('.category').forEach((cat, i) => {
            cat.classList.toggle('active', i === index);
        });
        
        // Show corresponding feature group
        document.querySelectorAll('.feature-group').forEach((group, i) => {
            group.classList.toggle('active', i === index);
        });
        
        this.selectedCategory = index;
    }
    
    panicKey() {
        // Instantly disable all features and hide menu
        Object.keys(this.features).forEach(feature => {
            if (typeof this.features[feature] === 'object' && this.features[feature].enabled !== undefined) {
                this.features[feature].enabled = false;
            }
        });
        
        // Disable all CS2 features
        if (this.cs2?.isInitialized) {
            // Reset glow effects
            this.cs2.getEnemyEntities().forEach(enemy => {
                this.cs2.setEntityGlow(enemy, false);
            });
            
            // Reset player modifications
            this.cs2.setPlayerSpeed(1.0);
            this.cs2.setPlayerCollision(true);
        }
        
        // Clear ESP overlay
        const espCanvas = document.getElementById('esp-overlay');
        if (espCanvas) {
            const ctx = espCanvas.getContext('2d');
            ctx.clearRect(0, 0, espCanvas.width, espCanvas.height);
        }
        
        document.getElementById('cheat-menu').style.display = 'none';
        this.menuVisible = false;
        
        // Reset all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        console.log('[420Cheats] PANIC KEY ACTIVATED - All features disabled');
    }
    
    logFeatureToggle(featureName, enabled) {
        const status = enabled ? 'ENABLED' : 'DISABLED';
        console.log(`[420Cheats] ${featureName} ${status}`);
        this.updateDebugOverlay();
    }
    
    updateDebugOverlay() {
        const activeFeatures = [];
        
        if (this.features.aimbot.enabled) activeFeatures.push('Aimbot');
        if (this.features.triggerbot.enabled) activeFeatures.push('Triggerbot');
        if (this.features.wallhack.enabled) activeFeatures.push('Wallhack');
        if (this.features.esp.enabled) activeFeatures.push('ESP');
        if (this.features.bhop.enabled) activeFeatures.push('Bhop');
        if (this.features.speedHack.enabled) activeFeatures.push('Speed');
        if (this.features.noClip.enabled) activeFeatures.push('NoClip');
        if (this.features.godMode.enabled) activeFeatures.push('God');
        
        const activeText = activeFeatures.length > 0 ? activeFeatures.join(', ') : 'None';
        document.getElementById('active-features').textContent = `Active Features: ${activeText}`;
    }
    
    startUpdateLoop() {
        // Main cheat update loop
        setInterval(() => {
            this.updateCheats();
        }, 16); // ~60 FPS
    }
    
    updateCheats() {
        // TODO: Integrate with actual game engine
        
        if (this.features.aimbot.enabled) {
            this.updateAimbot();
        }
        
        if (this.features.triggerbot.enabled) {
            this.updateTriggerbot();
        }
        
        if (this.features.esp.enabled) {
            this.updateESP();
        }
        
        if (this.features.wallhack.enabled) {
            this.updateWallhack();
        }
        
        if (this.features.speedHack.enabled) {
            this.updateSpeedHack();
        }
        
        if (this.features.bhop.enabled) {
            this.updateBunnyHop();
        }
        
        if (this.features.noClip.enabled) {
            this.updateNoClip();
        }
        
        if (this.features.godMode.enabled) {
            this.updateGodMode();
        }
    }
    
    // ===== CHEAT IMPLEMENTATIONS =====
    
    updateAimbot() {
        if (!this.cs2?.isInitialized) {
            // Fallback to original stub implementation
            console.log('[420Cheats] Aimbot running in demo mode');
            return;
        }
        
        const target = this.cs2.getNearestEnemy();
        if (!target) return;
        
        const player = this.cs2.getLocalPlayer();
        if (!player) return;
        
        const targetPos = this.cs2.getPlayerHeadPosition(target);
        const playerPos = this.cs2.getPlayerCameraPosition(player);
        
        const angle = this.cs2.calculateAngle(playerPos, targetPos);
        const currentAngles = this.cs2.getCurrentViewAngles();
        const fovCheck = this.cs2.isWithinFOV(angle, currentAngles, this.features.aimbot.fov);
        
        if (fovCheck) {
            // Add human-like imperfections
            const humanizedAngle = this.cs2.humanizeAim(angle);
            this.cs2.setViewAngles(humanizedAngle, this.features.aimbot.smooth);
            
            // Update debug info
            const distance = this.cs2.getDistance3D(playerPos, targetPos);
            document.getElementById('target-info').textContent = 
                `Target: ${target.name || 'Enemy'} [${Math.round(distance)}m]`;
        }
    }
    
    updateTriggerbot() {
        if (!this.cs2?.isInitialized) return;
        
        const crosshairTarget = this.cs2.getCrosshairTarget();
        if (crosshairTarget && this.cs2.isEnemy(crosshairTarget)) {
            // Add random delay for human-like behavior
            const delay = this.features.triggerbot.delay + this.cs2.randomizeTimings();
            
            setTimeout(() => {
                if (this.cs2.canShoot()) {
                    this.cs2.fireWeapon();
                }
            }, delay);
        }
    }
    
    updateESP() {
        if (!this.cs2?.isInitialized) return;
        
        const enemies = this.cs2.getEnemyEntities();
        const canvas = this.getOrCreateOverlayCanvas();
        const ctx = canvas.getContext('2d');
        
        // Clear previous ESP drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        enemies.forEach(enemy => {
            const headPos = this.cs2.getPlayerHeadPosition(enemy);
            const screenPos = this.cs2.worldToScreen(headPos);
            
            if (screenPos && this.isOnScreen(screenPos)) {
                this.drawESPForEntity(ctx, screenPos, enemy);
            }
        });
    }
    
    updateWallhack() {
        if (!this.cs2?.isInitialized) return;
        
        const enemies = this.cs2.getEnemyEntities();
        enemies.forEach(enemy => {
            // Red glow for enemies
            this.cs2.setEntityGlow(enemy, true, [255, 0, 0, 255]);
        });
        
        if (this.features.wallhack.weapons) {
            // Green glow for weapons (would need weapon entity detection)
            // this.cs2.getAllWeapons().forEach(weapon => {
            //     this.cs2.setEntityGlow(weapon, true, [0, 255, 0, 255]);
            // });
        }
    }
    
    updateSpeedHack() {
        if (!this.cs2?.isInitialized) return;
        
        this.cs2.setPlayerSpeed(this.features.speedHack.multiplier);
    }
    
    updateBunnyHop() {
        if (!this.cs2?.isInitialized) return;
        
        // Simplified bhop - jump when on ground
        if (this.features.bhop.perfectHops) {
            this.cs2.makePlayerJump();
        }
    }
    
    updateNoClip() {
        if (!this.cs2?.isInitialized) return;
        
        this.cs2.setPlayerCollision(false);
    }
    
    updateGodMode() {
        if (!this.cs2?.isInitialized) return;
        
        this.cs2.setPlayerHealth(100); // Keep health at 100
    }
    
    // ===== ESP RENDERING FUNCTIONS =====
    
    getOrCreateOverlayCanvas() {
        let canvas = document.getElementById('esp-overlay');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'esp-overlay';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '9998';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);
            
            // Resize handler
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }
        return canvas;
    }
    
    drawESPForEntity(ctx, screenPos, entity) {
        const boxHeight = 60;
        const boxWidth = 40;
        
        // ESP Box
        if (this.features.esp.boxes) {
            ctx.strokeStyle = entity.health > 50 ? '#00ff00' : '#ff0000';
            ctx.lineWidth = 2;
            ctx.strokeRect(
                screenPos.x - boxWidth/2, 
                screenPos.y - boxHeight/2, 
                boxWidth, 
                boxHeight
            );
        }
        
        // Name
        if (this.features.esp.names) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(
                entity.name || 'Enemy', 
                screenPos.x, 
                screenPos.y - boxHeight/2 - 5
            );
        }
        
        // Health
        if (this.features.esp.health) {
            const healthColor = entity.health > 75 ? '#00ff00' : 
                               entity.health > 25 ? '#ffff00' : '#ff0000';
            
            // Health bar
            ctx.fillStyle = healthColor;
            ctx.fillRect(
                screenPos.x - boxWidth/2 - 10, 
                screenPos.y - boxHeight/2, 
                5, 
                (entity.health / 100) * boxHeight
            );
            
            // Health text
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px Arial';
            ctx.fillText(
                entity.health.toString(), 
                screenPos.x - boxWidth/2 - 20, 
                screenPos.y
            );
        }
        
        // Distance
        if (this.features.esp.distance) {
            const playerPos = this.cs2?.getLocalPlayer()?.position;
            if (playerPos) {
                const distance = this.cs2.getDistance3D(playerPos, entity.position);
                ctx.fillStyle = '#cccccc';
                ctx.font = '10px Arial';
                ctx.fillText(
                    `${Math.round(distance)}m`, 
                    screenPos.x, 
                    screenPos.y + boxHeight/2 + 15
                );
            }
        }
        
        // Tracers
        if (this.features.esp.tracers) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(window.innerWidth / 2, window.innerHeight);
            ctx.lineTo(screenPos.x, screenPos.y);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }
    
    isOnScreen(screenPos) {
        return screenPos.x >= 0 && screenPos.x <= window.innerWidth &&
               screenPos.y >= 0 && screenPos.y <= window.innerHeight;
    }
    
    // ===== UTILITY FUNCTIONS (NOW USING CS2 INTEGRATION) =====
    
    getNearestEnemy() {
        return this.cs2?.getNearestEnemy() || null;
    }
    
    getLocalPlayer() {
        return this.cs2?.getLocalPlayer() || null;
    }
    
    getAllEnemies() {
        return this.cs2?.getEnemyEntities() || [];
    }
    
    getAllWeapons() {
        // TODO: Implement in CS2Integration
        return [];
    }
    
    getTargetHeadPosition(target) {
        return this.cs2?.getPlayerHeadPosition(target) || { x: 0, y: 0, z: 0 };
    }
    
    calculateAngle(from, to) {
        return this.cs2?.calculateAngle(from, to) || { pitch: 0, yaw: 0 };
    }
    
    smoothAim(targetAngle, smoothness) {
        if (this.cs2?.isInitialized) {
            this.cs2.setViewAngles(targetAngle, smoothness);
        }
    }
    
    worldToScreen(worldPos) {
        return this.cs2?.worldToScreen(worldPos) || null;
    }
    
    drawESPBox(screenPos, entity) {
        // Now handled by drawESPForEntity
        console.log('[420Cheats] ESP box drawing redirected to new system');
    }
    
    drawESPName(screenPos, entity) {
        // Now handled by drawESPForEntity
        console.log('[420Cheats] ESP name drawing redirected to new system');
    }
    
    drawESPHealth(screenPos, entity) {
        // Now handled by drawESPForEntity
        console.log('[420Cheats] ESP health drawing redirected to new system');
    }
    
    drawESPDistance(screenPos, entity) {
        // Now handled by drawESPForEntity
        console.log('[420Cheats] ESP distance drawing redirected to new system');
    }
    
    setEntityGlow(entity, enabled, color) {
        if (this.cs2?.isInitialized) {
            this.cs2.setEntityGlow(entity, enabled, color);
        }
    }
    
    setPlayerSpeed(player, multiplier) {
        if (this.cs2?.isInitialized) {
            this.cs2.setPlayerSpeed(multiplier);
        }
    }
    
    setPlayerCollision(player, enabled) {
        if (this.cs2?.isInitialized) {
            this.cs2.setPlayerCollision(enabled);
        }
    }
    
    setPlayerHealth(player, health) {
        if (this.cs2?.isInitialized) {
            this.cs2.setPlayerHealth(health);
        }
    }
    
    setPlayerInvulnerable(player, invulnerable) {
        // TODO: Implement in CS2Integration
        console.log(`[420Cheats] Setting invulnerable: ${invulnerable}`);
    }
    
    isPlayerOnGround(player) {
        // TODO: Implement in CS2Integration
        return false;
    }
    
    jumpPlayer(player) {
        if (this.cs2?.isInitialized) {
            this.cs2.makePlayerJump();
        }
    }
    
    fireBullet() {
        if (this.cs2?.isInitialized) {
            return this.cs2.fireWeapon();
        }
        return false;
    }
    
    getCrosshairTarget() {
        return this.cs2?.getCrosshairTarget() || null;
    }
    
    isEnemy(entity) {
        return this.cs2?.isEnemy(entity) || false;
    }
    
    isWithinFOV(angle, maxFOV) {
        if (this.cs2?.isInitialized) {
            const currentAngles = this.cs2.getCurrentViewAngles();
            return this.cs2.isWithinFOV(angle, currentAngles, maxFOV);
        }
        return false;
    }
    
    getDistance(pos1, pos2) {
        return this.cs2?.getDistance3D(pos1, pos2) || 0;
    }
    
    getPlayerCameraPosition(player) {
        return this.cs2?.getPlayerCameraPosition(player) || { x: 0, y: 0, z: 0 };
    }
    
    getMaxHealth(player) {
        return 100; // Standard CS2 health
    }
    
    // ===== CONFIG MANAGEMENT =====
    
    saveConfig() {
        const config = {
            features: this.features,
            timestamp: Date.now(),
            version: '2.1'
        };
        
        // TODO: Save to file or memory storage for QA builds
        // In production environment, you would save to a config file
        console.log('[420Cheats] Config saved:', config);
        
        // For demo purposes, save to memory
        this.savedConfig = config;
        alert('Config saved successfully!');
    }
    
    loadConfig() {
        // TODO: Load from file or memory storage
        if (this.savedConfig) {
            this.features = { ...this.savedConfig.features };
            this.updateUIFromConfig();
            console.log('[420Cheats] Config loaded');
            alert('Config loaded successfully!');
        } else {
            alert('No saved config found!');
        }
    }
    
    resetConfig() {
        if (confirm('Are you sure you want to reset all settings?')) {
            // Reset all features to default
            Object.keys(this.features).forEach(feature => {
                if (typeof this.features[feature] === 'object' && this.features[feature].enabled !== undefined) {
                    this.features[feature].enabled = false;
                }
            });
            
            // Reset UI
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            document.querySelectorAll('input[type="range"]').forEach(slider => {
                const defaultValues = {
                    'aimbot-fov': 90,
                    'aimbot-smooth': 5.0,
                    'trigger-delay': 50,
                    'speed-mult': 1.5
                };
                slider.value = defaultValues[slider.id] || slider.min;
                
                // Update display values
                const valueDisplay = document.getElementById(slider.id + '-val');
                if (valueDisplay) {
                    valueDisplay.textContent = slider.value;
                }
            });
            
            this.updateDebugOverlay();
            console.log('[420Cheats] Config reset to defaults');
            alert('Config reset successfully!');
        }
    }
    
    updateUIFromConfig() {
        // Update checkboxes based on config
        Object.keys(this.features).forEach(featureKey => {
            const feature = this.features[featureKey];
            if (typeof feature === 'object' && feature.enabled !== undefined) {
                const checkbox = document.getElementById(featureKey.replace(/([A-Z])/g, '-$1').toLowerCase() + '-enable');
                if (checkbox) {
                    checkbox.checked = feature.enabled;
                }
            }
        });
        
        // Update sliders
        document.getElementById('aimbot-fov').value = this.features.aimbot.fov;
        document.getElementById('aimbot-fov-val').textContent = this.features.aimbot.fov;
        document.getElementById('aimbot-smooth').value = this.features.aimbot.smooth;
        document.getElementById('aimbot-smooth-val').textContent = this.features.aimbot.smooth;
        document.getElementById('trigger-delay').value = this.features.triggerbot.delay;
        document.getElementById('trigger-delay-val').textContent = this.features.triggerbot.delay;
        document.getElementById('speed-mult').value = this.features.speedHack.multiplier;
        document.getElementById('speed-mult-val').textContent = this.features.speedHack.multiplier;
        
        this.updateDebugOverlay();
    }
    
    // ===== ANTI-DETECTION & SAFETY =====
    
    randomizeTimings() {
        // TODO: Add random delays to avoid detection patterns
        return Math.random() * 10 + 5; // 5-15ms random delay
    }
    
    humanizeMovement(targetAngle, currentAngle) {
        // TODO: Add human-like imperfections to aim movement
        const jitter = {
            pitch: (Math.random() - 0.5) * 0.1,
            yaw: (Math.random() - 0.5) * 0.1
        };
        return {
            pitch: targetAngle.pitch + jitter.pitch,
            yaw: targetAngle.yaw + jitter.yaw
        };
    }
    
    // ===== PERFORMANCE MONITORING =====
    
    startPerformanceMonitoring() {
        let lastFrameTime = performance.now();
        let frameCount = 0;
        let cheatFrameCount = 0;
        
        setInterval(() => {
            frameCount++;
            if (this.menuVisible || Object.values(this.features).some(f => f.enabled)) {
                cheatFrameCount++;
            }
        }, 16);
        
        setInterval(() => {
            const fps = Math.round(frameCount * 1000 / 1000);
            const cheatFps = Math.round(cheatFrameCount * 1000 / 1000);
            
            document.getElementById('performance').textContent = 
                `FPS: ${fps} | Cheat FPS: ${cheatFps}`;
            
            frameCount = 0;
            cheatFrameCount = 0;
        }, 1000);
    }
    
    // ===== INTEGRATION HELPERS =====
    
    // Memory scanning utilities (for advanced integration)
    scanPattern(pattern, mask) {
        // TODO: Implement pattern scanning for game memory
        // return memoryScanner.findPattern(pattern, mask);
        return null;
    }
    
    readMemory(address, size) {
        // TODO: Read game memory
        // return memoryReader.read(address, size);
        return null;
    }
    
    writeMemory(address, value, size) {
        // TODO: Write to game memory
        // return memoryWriter.write(address, value, size);
        return false;
    }
    
    // Hook game functions
    hookFunction(targetFunction, hookFunction) {
        // TODO: Hook game engine functions
        // return hooking.hook(targetFunction, hookFunction);
        return false;
    }
    
    // ===== INITIALIZATION =====
    
    static initialize() {
        const cheats = new CSGOStyleCheats();
        cheats.startPerformanceMonitoring();
        
        // Global access for debugging
        window.qaDebugCheats = cheats;
        
        console.log(`
╔══════════════════════════════════════╗
║           420Cheats QA v2.1          ║
║        Internal Testing Suite        ║
║                                      ║
║  Controls:                           ║
║  INSERT - Toggle Menu                ║
║  END    - Panic Key (Disable All)   ║
║                                      ║
║  Status: INITIALIZED                 ║
╚══════════════════════════════════════╝
        `);
        
        return cheats;
    }
}

// ===== AUTO-INITIALIZATION =====

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        CSGOStyleCheats.initialize();
    });
} else {
    CSGOStyleCheats.initialize();
}

// ===== EXPORT FOR MODULE SYSTEMS =====

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSGOStyleCheats;
}

if (typeof window !== 'undefined') {
    window.CSGOStyleCheats = CSGOStyleCheats;
}

/*
 * ===== INTEGRATION NOTES =====
 * 
 * To integrate this system with your game engine:
 * 
 * 1. ENTITY SYSTEM INTEGRATION:
 *    - Replace getNearestEnemy() with your entity manager calls
 *    - Implement getLocalPlayer() to return current player object
 *    - Connect getAllEnemies() to your team/faction system
 * 
 * 2. RENDERING INTEGRATION:
 *    - Implement worldToScreen() using your camera/projection matrices
 *    - Connect drawESP functions to your overlay rendering system
 *    - Hook setEntityGlow() into your shader/material system
 * 
 * 3. INPUT INTEGRATION:
 *    - Connect smoothAim() to your mouse input system
 *    - Implement fireBullet() with your weapon system
 *    - Hook movement functions to your player controller
 * 
 * 4. MEMORY/GAME STATE:
 *    - For advanced features, implement memory scanning functions
 *    - Hook critical game functions for real-time manipulation
 *    - Add anti-cheat bypass mechanisms for testing environments
 * 
 * 5. PERFORMANCE CONSIDERATIONS:
 *    - Run ESP updates at lower frequency than aimbot (30hz vs 60hz)
 *    - Use spatial partitioning for enemy detection
 *    - Implement feature-specific update rates
 * 
 * 6. SAFETY FEATURES:
 *    - Implement panic key functionality
 *    - Add detection evasion for legitimate testing
 *    - Include audit logging for QA test sessions
 */