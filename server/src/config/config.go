package config

// config
var (
	Prod bool
	Dir  string

	WebAddr   = `:80`
	MySQL     = `ruin:ruin@/ruin`
	StaticDir = `/static`
	ProtoDir  = `/www/ruin/proto`
	AssetDir  = `/www/ruin/static/asset`
)
