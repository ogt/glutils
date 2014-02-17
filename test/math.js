// license : public domain

tau = Math.PI * 2

normal = gaussian = function (mean, std, x) {
    return (1 / (std * Math.sqrt(tau))) * Math.exp(-((x - mean) * (x - mean)) / (2 * std * std))
}

